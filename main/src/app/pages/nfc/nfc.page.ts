import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { NdefEvent } from '@ionic-native/nfc';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { Router } from '@angular/router';


import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {
  loading: HTMLIonLoadingElement;
  listenAlert: HTMLIonAlertElement;

  existingObservable = false;
  ndefEventObservable: Observable<NdefEvent>;
  nfcSubscription: Subscription;

  products: Observable<any>;
  products1: Observable<any>;
  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();
  id = null;
  product = null;  
  amount = 0;
  
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private nfc: NFC, private ndef: Ndef, private alertController: AlertController,
    private productService: ProductService, 
    private cartService: CartService,
    private modalCtrl: ModalController,
    private db: AngularFirestore,
    private router: Router) { }
   
ngOnInit() {
  this.cartService.getCart().subscribe(cart => {
    console.log('cart: ', cart);
    this.amount = this.cartService.getItemCount(this.id);
  });
  }
  // on Ndef event - what happens when a tag is read
  private onNdefEvent(event) {
    this.listenAlert.dismiss();
  
    this.db.firestore.collection('products')
      .where('tagid','==', this.nfc.bytesToHexString(event.tag.id))
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { this.id = doc.id; })  
        this.productService.getOneProduct(this.id).subscribe(res => {
        this.product = res;
        this.product.id = this.id;
        this.amount = this.cartService.getItemCount(this.id);
        console.log('tag id', this.product.tagid);
        
          if(this.product.tagid == this.nfc.bytesToHexString(event.tag.id)){
            
          }
          else {
            this.presentAlert("Incorrect tag read");
          }
        });        
       });
    }
  // add product to cart
  addToCart() {
    console.log('product added', this.product);
    this.cartService.addProduct(this.product);
  }

// called when nfc button is clicked
  onDoneClicked() {
    this.setupNFC();
  }
// NFC is set up
  async setupNFC() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    this.setNdefListener()
      .then(() => {
        return this.setNdefSubscription();
      })
      .then(() => {
        this.loading.dismiss();
        this.setReadNfcAlert();
      })
      .catch(() => {
        this.loading.dismiss();
        this.alertNfcUnavailable();
      });
  }
  // Ndef listener
  setNdefListener(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.nfc.enabled()
        .then(() => {
          if (!this.existingObservable) {
            this.ndefEventObservable = this.nfc.addNdefListener();
            this.existingObservable = true;
            resolve();
          } else {
            resolve();
          }
        })
        .catch(() => {
          this.existingObservable = false;
          reject(new Error());
        });
    });
  }
  // Ndef Subscription
  private setNdefSubscription(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.nfcSubscription = this.ndefEventObservable.subscribe((event) => {
        this.onNdefEvent(event);
      });
      resolve();
    });
  }

  // Alert the user to approach an nfc tag
  private async setReadNfcAlert() {
    this.listenAlert = await this.alertCtrl.create({
      message: 'Please approach your phone to the NFC tag',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.nfcSubscription.unsubscribe();
          }
        }
      ]
    });
    await this.listenAlert.present();
    await this.listenAlert.onDidDismiss().then(() => {
      this.nfcSubscription.unsubscribe();
    });
  }
  // alert the user to turn on nfc on device
  private alertNfcUnavailable() {
    this.alertCtrl.create({
      message: 'Please enable NFC first',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel'
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  async presentAlert(mess) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mess,
      buttons: ['OK', 'Cancel']
    });
    await alert.present();
  }
// open cart
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
}
  
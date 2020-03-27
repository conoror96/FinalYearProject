import { Component, OnInit } from '@angular/core';
import { NfcServiceService } from '../../services/nfc-service.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { NdefEvent } from '@ionic-native/nfc';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { SellerListDetailsPage } from '../seller-list-details/seller-list-details.page';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


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
  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();
  id = null;
  //id2 = null;
  product = null;  
  amount = 0;
  tagId = null;

  constructor(private db: NfcServiceService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private databaseService: NfcServiceService,
    private router: Router,
    private route: ActivatedRoute, private nfc: NFC, private ndef: Ndef, private alertController: AlertController,
    private productService: ProductService, 
    private cartService: CartService,
    private modalCtrl: ModalController) { }
    /*private iab: InAppBrowser*/


ngOnInit() {
  this.products = this.productService.getAllProducts();
  //this.id = "04d55792285e80";
  //this.tagId = this.route.snapshot.paramMap.get('tagid');
  this.productService.getOneProduct(this.id).subscribe(res => {
    // debugging
    console.log('my product: ', res);
    this.product = "PwkPUouXZdJcByzSb3ZL";
    //this.product.id = this.id;
    this.amount = this.cartService.getItemCount(this.id);
    console.log(this.product.tagid);
  });
}

// loop over all products and check tagids for a match to tagid read by nfc

  onDoneClicked() {
    this.setupNFC();
  }

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

  private setNdefSubscription(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.nfcSubscription = this.ndefEventObservable.subscribe((event) => {
        this.onNdefEvent(event);
      });
      resolve();
    });
  }

  
  private onNdefEvent(event) {
    this.listenAlert.dismiss();
    this.presentAlert('tagid from tag ' + this.nfc.bytesToHexString(event.tag.id));
      this.presentAlert('tagid from db' + this.product.tagid);
      
    if(this.nfc.bytesToHexString(event.tag.id) == this.product.tagid){
      this.cartService.addProduct(this.product);
     }
     else {
       this.presentAlert("error tag read")
     }

  
  
    
   
  }

// writing to tag
writeNFC() {
  this.nfc.addNdefListener(() => {
    console.log('successfully attached ndef listener');
    const message = this.ndef.textRecord('Hello world');
    this.nfc.share([message]).then(
        value => {
          this.presentAlert('okok');
        }
    ).catch(
        reason => {
          this.presentAlert('ko .catch');
        }
    );
  }, (err) => {
    this.presentAlert('ko error' + err);
  });

}

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

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }



}

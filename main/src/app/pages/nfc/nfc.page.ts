//import { Component, OnInit } from '@angular/core';
//import { NfcServiceService } from '../../services/nfc-service.service';
//import { Observable, Subscription } from 'rxjs';
//import { NdefEvent } from '@ionic-native/nfc';
//import { NFC } from '@ionic-native/nfc/ngx';
//import { AlertController, LoadingController } from '@ionic/angular';
//import { Router } from '@angular/router';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { Observable, BehaviorSubject } from 'rxjs';

import { Component } from '@angular/core';
import { Ndef, NFC} from '@ionic-native/nfc/ngx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage {
  products: Observable<any>;
  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();
  id = null;
  //id2 = null;
  product = null;  
  amount = 0;
  
  constructor(private route: ActivatedRoute, private nfc: NFC, private ndef: Ndef, private alertController: AlertController,
    private productService: ProductService, 
    private cartService: CartService,
    private modalCtrl: ModalController) { }


    ngOnInit() {
      this.products = this.productService.getAllProducts();
      this.id = "5QFERHsRNuTsNbYU3aac";
      this.productService.getOneProduct(this.id).subscribe(res => {
        // debugging
        console.log('my product: ', res);
        this.product = res;
        //this.product.id = this.id;
        this.amount = this.cartService.getItemCount(this.id);
      });
    }
    
    /*this.myListener = this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
      }, (err) => {
      console.log('error attaching ndef listener', err);
      }).subscribe((event) => {
    
      });*/

  readNFC() {
    this.nfc.addNdefListener(() => {
      this.presentAlert('Tap an NFC tag');
    }, (err) => {
      this.presentAlert('ko' + err);
    }).subscribe((event) => {
      console.log(event);
      console.log(JSON.stringify(event));

      //this.presentAlert('This message contains' + event.tag + ' ' + this.nfc.bytesToHexString(event.tag.id));
      if (this.nfc.bytesToHexString(event.tag.id) == "049a1092285e80"){
        //this.presentAlert('Item Added to basket');
        this.cartService.addProduct(this.product);
        //remove listener

        this.presentAlert('Item Added to basket');
        
        }

        

        
      
      
      else {
        this.presentAlert('Incorrect tag read');
      }
      
    });

    

  }unsuscribe;

  

  /*writeNFC() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
      const message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then(
          value => {
            this.presentAlert('ok');
          }
      ).catch(
          reason => {
            this.presentAlert('ko');
          }
      );
    }, (err) => {
      this.presentAlert('ko' + err);
    });

  }*/

  

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

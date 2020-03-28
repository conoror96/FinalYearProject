import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-buyer-list-details',
  templateUrl: './buyer-list-details.page.html',
  styleUrls: ['./buyer-list-details.page.scss'],
})
export class BuyerListDetailsPage implements OnInit {
  id = null;
  
  product = null;
  amount = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService,
    private nfc: NFC, private ndef: Ndef, private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getOneProduct(this.id).subscribe(res => {
      // debugging
      console.log('my product: ', res);
      this.product = res;
      this.product.id = this.id;
      console.log("my id ",this.id);
      this.amount = this.cartService.getItemCount(this.id);
      console.log('tag id', this.product.tagid);
      
    });

    this.cartService.getCart().subscribe(cart => {
      // debugging
      console.log('cart: ', cart);
      this.amount = this.cartService.getItemCount(this.id);
    });
  }

  addToCart() {
    // debugging
   
    console.log('product added', this.product);
    this.cartService.addProduct(this.product);
  }

  removeFromCart() {
    this.cartService.decreaseProduct(this.product);
  }

  


  /*readNFC() {
    this.nfc.addNdefListener(() => {
      this.presentAlert('ok');
    }, (err) => {
      this.presentAlert('ko' + err);
    }).subscribe((event) => {
      console.log(event);
      console.log(JSON.stringify(event));

      this.presentAlert('tagid from tag ' + this.nfc.bytesToHexString(event.tag.id));
      this.presentAlert('tagid from db' + this.product.tagid);
     // this.presentAlert()

     if(this.product.tagid == this.nfc.bytesToHexString(event.tag.id)){
      this.cartService.addProduct(this.product);
     }
     else {
       this.presentAlert("error tag read")
     }
     // this.presentAlert('This message contains' + event.tag + ' ' + this.nfc.bytesToHexString(event.tag.id));
    });

  }

  async presentAlert(mess) {
    const alert = await this.alertController.create({
      header: 'attention',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }*/

}
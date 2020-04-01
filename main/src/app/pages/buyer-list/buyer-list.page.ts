import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import {  } from 'rxjs/Observable';


@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.page.html',
  styleUrls: ['./buyer-list.page.scss'],
})
export class BuyerListPage implements OnInit {
  products: Observable<any>;
  searchCategory: string= "";
  searchProduct: string="";
  

  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();


  constructor(private auth: AuthService, private productService: ProductService, 
    private cartService: CartService, private modalCtrl: ModalController) { }
    

  ngOnInit() {
    this.products = this.productService.getAllProducts();
    console.log("all products", this.products);
  }

 

  signOut() {
    this.auth.signOut();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }

}

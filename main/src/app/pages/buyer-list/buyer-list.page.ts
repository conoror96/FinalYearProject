import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.page.html',
  styleUrls: ['./buyer-list.page.scss'],
})
export class BuyerListPage implements OnInit {
  products: Observable<any>;
 
  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();

  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  constructor(private auth: AuthService, private productService: ProductService, 
    private cartService: CartService, private modalCtrl: ModalController,
    private router: Router) { }
    
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

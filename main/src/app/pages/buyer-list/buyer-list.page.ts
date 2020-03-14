import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.page.html',
  styleUrls: ['./buyer-list.page.scss'],
})
export class BuyerListPage implements OnInit {
  products: Observable<any>;
  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();

  constructor(private auth: AuthService, private productService: ProductService, 
    private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts();
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

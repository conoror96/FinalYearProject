import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart = [];

  constructor(private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(res => {
      this.cart = res;
    })
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}


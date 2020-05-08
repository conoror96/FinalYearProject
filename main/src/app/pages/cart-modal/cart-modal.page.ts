import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart = [];

  constructor(private cartService: CartService, private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(res => {
      this.cart = res;
    })
  }
  // call decrease item count method
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 // call increase item count method
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
  // call remove item from cart method
  removeCartItem(product) { 
    this.cartService.removeProduct(product);
  }
  // gets total price of items in cart
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
  // close the overlay
  close() {
    this.modalCtrl.dismiss();
  }
  // go to checkout
  checkout(){
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('/buyer/checkout');
  }

}


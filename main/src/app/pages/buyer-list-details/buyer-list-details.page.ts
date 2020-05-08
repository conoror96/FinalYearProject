import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-buyer-list-details',
  templateUrl: './buyer-list-details.page.html',
  styleUrls: ['./buyer-list-details.page.scss'],
})

export class BuyerListDetailsPage implements OnInit {
  id = null;
  product = null;
  amount = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // gets the specific product by id
    this.productService.getOneProduct(this.id).subscribe(res => {
      console.log('my product: ', res);
      this.product = res;
      this.product.id = this.id;
      console.log("my id ",this.id);
      this.amount = this.cartService.getItemCount(this.id);
      console.log('tag id', this.product.tagid);
    });
    // get cart
    this.cartService.getCart().subscribe(cart => {
      console.log('cart: ', cart);
      this.amount = this.cartService.getItemCount(this.id);
    });
  }
  // add item to cart
  addToCart() {
    console.log('product added', this.product);
    this.cartService.addProduct(this.product);
  }
  // remove item from cart
  removeFromCart() {
    this.cartService.decreaseProduct(this.product);
  }
}
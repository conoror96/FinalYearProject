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
    this.productService.getOneProduct(this.id).subscribe(res => {
      console.log('my product: ', res);
      this.product = res;
      this.product.id = this.id;
      this.amount = this.cartService.getItemCount(this.id);
    });

    this.cartService.getCart().subscribe(cart => {
      this.amount = this.cartService.getItemCount(this.id);
    });
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }

  removeFromCart() {
    this.cartService.decreaseProduct(this.product);
  }

}
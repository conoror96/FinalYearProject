import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.page.html',
  styleUrls: ['./seller-list.page.scss'],
})
export class SellerListPage implements OnInit {
  products: Observable<any>;

  constructor(private auth: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getSellerProducts();
    console.log(this.products);
  }

  delete(id) {
    this.productService.deleteProduct(id);
  }

  signOut() {
    this.auth.signOut();
  }

}


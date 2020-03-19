import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { tap } from 'rxjs/operators';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.page.html',
  styleUrls: ['./buyer-orders.page.scss'],
})
export class BuyerOrdersPage implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getCusomterOrders().subscribe(res => {
      console.log('my orders: ', res);
    });
  }

}

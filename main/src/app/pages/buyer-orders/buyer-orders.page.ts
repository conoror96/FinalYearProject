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
  payments = [];
  items = {};


  constructor(private productService: ProductService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.productService.getCustomerOrders().subscribe(res => {
      console.log('my orders: ', res);
      this.payments = res.data;
      this.payments.map(item => {
        console.log('map: ', item);
        item.order = this.productService.getOrderData(item.id).pipe(
          tap(data => {
            if (data) {
              console.log('data: ', data);
              for (let item of data['items']) {
                console.log('one item: ', item);
                
                if (!this.items[item.id]) {
                  this.items[item.id] = {};
                  this.productService.getOneProduct(item.id).pipe(
                    tap(product => {
                      console.log('product: ', product);
                      this.items[item.id].name = product['name'];
                    })
                  ).subscribe();
                }
              }
            }
          })
        )
        return item;
      });
    });
  }

  openInvoice(item) {
    this.productService.getOrderData(item.id).subscribe(res => {  
      console.log('my order: ', res);
      const browser = this.iab.create(res['invoice'], '_system');
    });
  }
}




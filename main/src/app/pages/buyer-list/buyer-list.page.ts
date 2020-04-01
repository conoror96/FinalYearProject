import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.page.html',
  styleUrls: ['./buyer-list.page.scss'],
})
export class BuyerListPage implements OnInit {
  products: Observable<any>;
  cartItemCount: BehaviorSubject<number> = this.cartService.getCartItemCount();

  //public products: any[];
  //public loadedProducts: any[];

  constructor(private auth: AuthService, private productService: ProductService, 
    private cartService: CartService, private modalCtrl: ModalController,
    private menu: MenuController, private firestore: AngularFirestore) { }
    

  ngOnInit() {
    this.products = this.productService.getAllProducts();
    console.log("all products", this.products);
    
    //this.goalList = goalList

    /*this.firestore.collection(`products`).valueChanges()
      .subscribe(products => {
        this.products = products;
        this.loadedProducts = products;
    }); */
  }

  /*
  initializeItems(): void {
    this.products = this.loadedProducts;
  }

  filterProducts(event) {
    this.initializeItems();
  
    const searchTerm = event.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.products = this.products.filter(currentGoal => {
      if (currentGoal.goalName && searchTerm) {
        if (currentGoal.goalName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  */


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

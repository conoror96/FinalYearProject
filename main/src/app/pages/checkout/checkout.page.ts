import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
 
declare var Stripe;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {
  dataForm: FormGroup;
  cart = [];

  stripe;
  card;
  cardErrors;

  
  @ViewChild("cardElement", { static: true }) cardElement: ElementRef;
  
  constructor(
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private authService: AuthService,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private cartService: CartService,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.cartService.getCart().subscribe(res => {
      this.cart = res;
    });
 
    this.dataForm = this.fb.group({
      name: ['Conor OReilly', Validators.required],
      zip: ['12345', Validators.required],
      street: ['Corrib Park', Validators.required],
      city: ['Galway', Validators.required],
      country: ['IE', Validators.required]
    });

 
    this.stripe = Stripe(environment.stripe_key);
    const elements = this.stripe.elements();

    this.card = elements.create("card");
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener("change", ({ error }) => {
      console.log("error: ", error);
      this.cardErrors = error && error.message;
    });
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
 
  async buyNow() {
   
  }
}
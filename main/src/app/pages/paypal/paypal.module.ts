import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalPageRoutingModule } from './paypal-routing.module';
import { RouterModule } from '@angular/router';

import { PaypalPage } from './paypal.page';
import { PayPal } from '@ionic-native/paypal/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaypalPage
      }
    ])
  ],
  declarations: [PaypalPage],
  providers: [PayPal]
})
export class PaypalPageModule {}

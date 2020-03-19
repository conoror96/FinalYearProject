import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyerOrdersPageRoutingModule } from './buyer-orders-routing.module';

import { BuyerOrdersPage } from './buyer-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyerOrdersPageRoutingModule
  ],
  declarations: [BuyerOrdersPage]
})
export class BuyerOrdersPageModule {}

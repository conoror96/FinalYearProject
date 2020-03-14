import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerListDetailsPageRoutingModule } from './seller-list-details-routing.module';

import { SellerListDetailsPage } from './seller-list-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerListDetailsPageRoutingModule
  ],
  declarations: [SellerListDetailsPage]
})
export class SellerListDetailsPageModule {}

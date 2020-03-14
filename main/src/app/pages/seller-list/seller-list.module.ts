import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerListPageRoutingModule } from './seller-list-routing.module';

import { SellerListPage } from './seller-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerListPageRoutingModule
  ],
  declarations: [SellerListPage]
})
export class SellerListPageModule {}

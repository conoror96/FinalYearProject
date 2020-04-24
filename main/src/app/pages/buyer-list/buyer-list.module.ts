import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyerListPageRoutingModule } from './buyer-list-routing.module';

import { BuyerListPage } from './buyer-list.page';

import { FilterPipe } from '../../pipes/filter.pipe';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyerListPageRoutingModule
  ],
  declarations: [BuyerListPage, FilterPipe]
})
export class BuyerListPageModule {}

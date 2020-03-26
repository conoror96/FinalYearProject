import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerListDetailsPageRoutingModule } from './seller-list-details-routing.module';

import { SellerListDetailsPage } from './seller-list-details.page';

import { Ndef, NFC} from '@ionic-native/nfc/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerListDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SellerListDetailsPage],
  providers: [NFC, Ndef]
})
export class SellerListDetailsPageModule {}


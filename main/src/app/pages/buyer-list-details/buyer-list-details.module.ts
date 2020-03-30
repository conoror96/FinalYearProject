import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyerListDetailsPageRoutingModule } from './buyer-list-details-routing.module';

import { BuyerListDetailsPage } from './buyer-list-details.page';

import { Ndef, NFC} from '@ionic-native/nfc/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyerListDetailsPageRoutingModule
  ],
  declarations: [BuyerListDetailsPage],
  providers: [Ndef, NFC]
})
export class BuyerListDetailsPageModule {}

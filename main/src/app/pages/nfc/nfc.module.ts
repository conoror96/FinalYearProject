import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { NfcPageRoutingModule } from './nfc-routing.module';

import { NfcPage } from './nfc.page';

import {NFC} from '@ionic-native/nfc/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NfcPageRoutingModule
  ],
  declarations: [NfcPage],
  providers: [NFC]
})
export class NfcPageModule {}

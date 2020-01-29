import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardReaderPageRoutingModule } from './card-reader-routing.module';

import { CardReaderPage } from './card-reader.page';
import {CardIO} from '@ionic-native/card-io/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardReaderPageRoutingModule
  ],
  declarations: [CardReaderPage],
  providers: [CardIO]
})
export class CardReaderPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChristianPageRoutingModule } from './christian-routing.module';

import { ChristianPage } from './christian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChristianPageRoutingModule
  ],
  declarations: [ChristianPage]
})
export class ChristianPageModule {}

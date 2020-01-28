import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountListPageRoutingModule } from './account-list-routing.module';

import { AccountListPage } from './account-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountListPageRoutingModule
  ],
  declarations: [AccountListPage]
})
export class AccountListPageModule {}

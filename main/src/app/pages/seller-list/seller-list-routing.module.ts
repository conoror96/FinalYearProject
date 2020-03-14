import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerListPage } from './seller-list.page';

const routes: Routes = [
  {
    path: '',
    component: SellerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerListPageRoutingModule {}

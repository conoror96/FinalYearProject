import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerListDetailsPage } from './seller-list-details.page';

const routes: Routes = [
  {
    path: '',
    component: SellerListDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerListDetailsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerListDetailsPage } from './buyer-list-details.page';

const routes: Routes = [
  {
    path: '',
    component: BuyerListDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerListDetailsPageRoutingModule {}

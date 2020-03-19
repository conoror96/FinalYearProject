import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerOrdersPage } from './buyer-orders.page';

const routes: Routes = [
  {
    path: '',
    component: BuyerOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerOrdersPageRoutingModule {}

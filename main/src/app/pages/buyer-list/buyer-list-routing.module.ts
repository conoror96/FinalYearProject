import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerListPage } from './buyer-list.page';

const routes: Routes = [
  {
    path: '',
    component: BuyerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerListPageRoutingModule {}

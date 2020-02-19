import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductlistPage } from './productlist.page';

const routes: Routes = [
  {
    path: '',
    component: ProductlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductlistPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChristianPage } from './christian.page';

const routes: Routes = [
  {
    path: '',
    component: ChristianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChristianPageRoutingModule {}

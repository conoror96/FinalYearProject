import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardReaderPage } from './card-reader.page';

const routes: Routes = [
  {
    path: '',
    component: CardReaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardReaderPageRoutingModule {}

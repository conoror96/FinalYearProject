import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountListPage } from './account-list.page';

const routes: Routes = [
  {
    path: '',
    component: AccountListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountListPageRoutingModule {}

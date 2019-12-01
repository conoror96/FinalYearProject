import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { TabsPage } from './tabs.page';
/* import { HomePage } from '../home/home.page';
import { ListPage } from '../list/list.page';
import { ContactPage } from '../contact/contact.page'; */
import { AuthGuardService } from '../../services/auth-route-guard'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },  
      {
        path: 'list',
        canActivate: [AuthGuardService],
        children: [
        {
          path: '',
          loadChildren: () =>
          import('../list/list.module').then(m => m.ListModule)
        }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../contact/contact.module').then(m => m.ContactPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
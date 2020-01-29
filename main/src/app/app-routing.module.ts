import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: '', loadChildren: './pages/account-list/account-list.module#AccountListPageModule' },
  { path: 'account-list', loadChildren: './pages/account-list/account-list.module#AccountListPageModule' },
  { path: 'idea', loadChildren: './pages/account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'idea/:id', loadChildren: './pages/account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'card-reader',
    loadChildren: () => import('./pages/card-reader/card-reader.module').then( m => m.CardReaderPageModule)
  },
  {
    path: 'christian',
    loadChildren: () => import('./pages/christian/christian.module').then( m => m.ChristianPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule)
  },
  
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
}) 
export class AppRoutingModule { }      
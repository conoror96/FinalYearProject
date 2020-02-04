import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  //{ path: '', loadChildren: './home/home/home.module#HomePageModule' },
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
    path: 'nfc',
    loadChildren: () => import('./pages/nfc/nfc.module').then( m => m.NfcPageModule)
  },
  {
    path: 'paypal',
    loadChildren: () => import('./pages/paypal/paypal.module').then( m => m.PaypalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  }
  
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
}) 
export class AppRoutingModule { }      
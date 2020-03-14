import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RoleGuard } from './guards/role.guard';
import { AutomaticLoginGuard } from './guards/automatic-login.guard';

// 
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);
const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AutomaticLoginGuard]
  },
  {
    path: 'buyer',
    canActivate: [AngularFireAuthGuard, RoleGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      role: 'BUYER'
    },
    children: [ 
      {
        path: 'list',
        loadChildren: () => import('./pages/buyer-list/buyer-list.module').then( m => m.BuyerListPageModule)
      },
      {
        path: 'list/:id',
        loadChildren: () => import('./pages/buyer-list-details/buyer-list-details.module').then( m => m.BuyerListDetailsPageModule)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'seller',
    canActivate: [AngularFireAuthGuard, RoleGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      role: 'SELLER'
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/seller-list/seller-list.module').then( m => m.SellerListPageModule)
      },
      {
        path: 'list/new',
        loadChildren: () => import('./pages/seller-list-details/seller-list-details.module').then( m => m.SellerListDetailsPageModule)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }//,
  //{ path: '', loadChildren: './home/home/home.module#HomePageModule' },
  /*{ path: 'account-list', loadChildren: './pages/account-list/account-list.module#AccountListPageModule' },
  { path: 'idea', loadChildren: './pages/account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'idea/:id', loadChildren: './pages/account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'card-reader',
    loadChildren: () => import('./pages/card-reader/card-reader.module').then( m => m.CardReaderPageModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./pages/shopping/shopping.module').then( m => m.ShoppingPageModule)
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
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'productlist',
    loadChildren: () => import('./pages/productlist/productlist.module').then( m => m.ProductlistPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  }*/
  
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
}) 
export class AppRoutingModule { }      
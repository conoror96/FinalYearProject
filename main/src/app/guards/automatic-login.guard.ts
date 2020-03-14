import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutomaticLoginGuard implements CanActivate  {
  constructor(private router: Router, private auth: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log('user in here: ', user);
        if (!user) {
          return true;
        } else {
          const role = user['role'];

          if (role == 'BUYER') {
            this.router.navigateByUrl('/buyer');
          } else if (role == 'SELLER') {
            this.router.navigateByUrl('/seller');
          }
          return false;
        }
      })
    );
  }
}

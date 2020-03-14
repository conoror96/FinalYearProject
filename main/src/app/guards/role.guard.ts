import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data.role;

    // returns a boolean value for if it a buyer or seller account
    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log('user in here: ', user);
        if (!user) {
          return false;
        } else {
          const role = user['role'];
          if (expectedRole == role) {
            return true;
          } else {
            this.router.navigateByUrl('/');
            return false;
          }
        }
      })
    );
  }
}

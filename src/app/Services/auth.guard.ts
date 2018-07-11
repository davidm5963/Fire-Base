import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.getFirebaseUser() !== null){
          return true;
        }
        return this.authService.getCurrentUser().pipe(
          map(user => !!user),
           take(1),
           tap(loggedIn => {
             if (!loggedIn) {
               console.log("access denied")
               this.router.navigate(['/login']);
             }
         })
        )
      }
}

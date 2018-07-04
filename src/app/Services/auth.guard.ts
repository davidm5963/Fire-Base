import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: firebase.User;

  constructor(private authService: AuthService, private router: Router){
    this.user = this.authService.getFirebaseUser();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.user != null){
          return true;
        }
        else{
          this.router.navigate(['login']);
          return false;
        }
      }
}

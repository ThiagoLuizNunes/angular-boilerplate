import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router } from '@angular/router';
import { AuthFactory } from 'src/app/modules/auth/auth.factory';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private storage: AuthFactory,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | boolean {
      if (this.storage.getLocalStorage()) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
  }
}

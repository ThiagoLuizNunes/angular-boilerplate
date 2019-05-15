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
export class SignupGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: AuthFactory) {}

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


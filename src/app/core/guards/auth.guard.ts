import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AuthFactory } from 'src/app/modules/auth/auth.factory';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AuthFactory,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.storage.getLocalStorage()) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.authService.getUser()
      .pipe(
        map(data => {
          return true;
        }),
        catchError((err) => {
          this.authService.logout();
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}


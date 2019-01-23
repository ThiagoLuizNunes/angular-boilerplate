import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  api = environment.apiUrl;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const { access_token } = JSON.parse(localStorage.getItem(environment.app_userkey));

    if (!access_token) {
      this.router.navigate(['/login']);
      return false;
    }
    this.authService.isAuthenticated(access_token, (err, res) => {
      if (err) {
        this.router.navigate(['/login']);
        return false;
      }
    });
    return true;
  }
}

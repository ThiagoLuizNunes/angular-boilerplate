import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class UserDetailResolver implements Resolve<any> {

  constructor(private authService: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const user = this.authService.getUser();
    return user;
  }
}

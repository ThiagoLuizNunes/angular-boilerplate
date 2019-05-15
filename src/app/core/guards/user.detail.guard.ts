import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserDetailResolver implements Resolve<any> {

  constructor(private authService: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return this.authService.getUser()
      .pipe(
        map(data => {
          return data;
        }),
        catchError((err) => {
          console.log('Error in resolver: ', err);
          return err;
        })
      );
  }
}


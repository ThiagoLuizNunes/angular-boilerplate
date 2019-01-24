import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = this.authService.getUser();
    console.log('inside interceptor')
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user ? user.access_token : ''}`
      }
    });
    return next.handle(tokenReq);
  }
}

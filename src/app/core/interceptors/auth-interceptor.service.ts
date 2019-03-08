import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthFactory } from 'src/app/modules/auth/auth.factory';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  object: any;
  constructor(private storage: AuthFactory) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.object = this.storage.getLocalStorage();
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.object ? this.object.jwt : ''}`
      }
    });
    return next.handle(tokenReq);
  }
}


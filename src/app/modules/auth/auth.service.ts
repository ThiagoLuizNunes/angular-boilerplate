import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ICallback from '../../shared/types/icallback.types';
import { AuthFactory } from './auth.factory';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user = null;
  private api = environment.apiUrl;

  emitterIsAuthenticated = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private strg: AuthFactory) { }

  getUser(): any {
    if (!this.user) {
      this.user = this.strg.getLocalStorage();
    }
    return this.user;
  }

  submit(url: string, user: any, callback: ICallback): any {
    this.http.post<any>(`${this.api}/auth/${url}`, user)
      .subscribe(
        response => {
          localStorage.setItem(environment.app_userkey, JSON.stringify(response));
          if (callback) {
            callback(null, response);
          }
        },
        error => {
          if (callback) {
            callback(error);
          }
        }
      );
  }

  login(user: any, callback: ICallback): any {
    this.submit('login', user, callback);
  }

  signup(user: any, callback: ICallback): any {
    this.submit('signup', user, callback);
  }

  logout(callback?: ICallback): any {
    this.user = null;
    this.strg.removeLocalStorage();
    if (callback) {
      callback(null);
    }
  }

  patchUser(user: any, callback?: ICallback) {
    this.http.patch<any>(`${this.api}/auth/user`, user)
      .subscribe(
        response => {
          this.strg.setLocalStorage(response);
          if (callback) {
            callback(null, response);
          }
        },
        error => {
          if (callback) {
            callback(error);
          }
        }
      );
  }

  isAuthenticated(token: any, callback?: ICallback): any {
    this.http.post<any>(`${this.api}/auth/validateToken`, { token })
      .subscribe(
        response => {
          if (!response.valid) {
            this.strg.removeLocalStorage();
            callback(response);
          } else {
            callback(null, response);
          }
        },
        error => {
          if (callback) {
            callback(error);
          }
        }
      );
  }
}

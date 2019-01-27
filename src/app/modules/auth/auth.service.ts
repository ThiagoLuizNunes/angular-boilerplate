import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ICallback from '../../shared/types/icallback.types';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = null;
  api = environment.apiUrl;

  emitterIsAuthenticated = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getUser(): any {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem(environment.app_userkey));
    }
    return this.user;
  }

  getTest(callback: ICallback): any {
    this.http.get<any>(`${this.api}/auth/test`)
      .subscribe(
        response => {
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
    localStorage.removeItem(environment.app_userkey);
    if (callback) {
      callback(null);
    }
  }

  isAuthenticated(token: any, callback?: ICallback): any {
    this.http.post<any>(`${this.api}/auth/validateToken`, { token })
      .subscribe(
        response => {
          if (!response.valid) {
            localStorage.removeItem(environment.app_userkey);
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

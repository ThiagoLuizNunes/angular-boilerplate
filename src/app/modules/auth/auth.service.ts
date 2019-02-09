import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ICallback from '../../shared/types/icallback.types';
import { AuthFactory } from './auth.factory';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user = null;
  private api = environment.apiUrl;

  emitterIsAuthenticated = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private authFactory: AuthFactory) { }

  getUser(): any {
    if (!this.user) {
      this.user = this.authFactory.getLocalStorage();
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
    this.authFactory.removeLocalStorage();
    if (callback) {
      callback(null);
    }
  }

  patchUser(user: any, callback?: ICallback) {
    this.http.patch<any>(`${this.api}/auth/user`, user)
      .subscribe(
        response => {
          this.authFactory.setLocalStorage(response);
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
  getUserLicenses(id: any): Observable<any> {
    return this.http.get<any>(`${this.api}/auth/user-licenses/${id}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.authFactory.handleError)
      );
  }

  isAuthenticated(token: any): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/validateToken`, { token })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.authFactory.handleError)
      );
  }
}

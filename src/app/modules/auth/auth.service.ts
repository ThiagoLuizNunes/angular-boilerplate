import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthFactory } from './auth.factory';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import ICallback from '../../shared/types/icallback.types';

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

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.api}/users`)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.authFactory.handleError)
      );
  }

  submit(url: string, user: any, callback: ICallback): any {
    this.http.post<any>(`${this.api}/${url}`, user)
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
    this.submit('auth', user, callback);
  }

  signup(user: any, callback: ICallback): any {
    this.submit('users', user, callback);
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
        // retry(3), // retry a failed request up to 3 times
        catchError(this.authFactory.handleError)
      );
  }

  isAuthenticated(token: any): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/validateToken`, { token })
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.authFactory.handleError)
      );
  }
}

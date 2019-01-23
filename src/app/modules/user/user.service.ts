import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ICallback from '../../shared/types/icallback.types';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user = null;
  api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(): any {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem(environment.app_userkey));
    }
    return this.user;
  }

  submit(url: string, user: any, callback: ICallback): any {
    this.http.post(`${this.api}/auth/${url}`, user)
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
}

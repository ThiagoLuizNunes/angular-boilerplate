import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthFactory {

  constructor() { }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem(environment.app_userkey));
  }
  setLocalStorage(data) {
    localStorage.setItem(environment.app_userkey, JSON.stringify(data));
  }
  removeLocalStorage() {
    localStorage.removeItem(environment.app_userkey);
  }
}

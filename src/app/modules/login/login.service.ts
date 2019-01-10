import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {}

  setLayoutOption(vm, option) {
    if (option === 'login') {
      vm.loginMode = true;
      vm.signupMode = false;
      vm.forgotMode = false;
    } else if (option === 'signup') {
      vm.loginMode = false;
      vm.signupMode = true;
      vm.forgotMode = false;
    } else {
      vm.loginMode = false;
      vm.signupMode = false;
      vm.forgotMode = true;
    }
  }
}

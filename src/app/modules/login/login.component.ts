import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { UserService } from '../user/user.service';
import { MsgsService } from '../../shared/services/msgs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {};
  loginMode: boolean;
  signupMode: boolean;
  forgotMode: boolean;

  // constructor(private userService: UserService, private msgs: MsgsService, private loginService: LoginService) {}
  constructor() {}

  ngOnInit() {
  }
}

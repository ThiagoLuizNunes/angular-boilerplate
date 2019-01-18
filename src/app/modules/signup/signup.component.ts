import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { MsgsService } from '../../shared/services/msgs.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  terms_service = false;

  constructor(private userService: UserService, private msgs: MsgsService) { }

  ngOnInit() {
  }

  login(): any {
    this.userService.login(this.user, (err, res) => {
      if (err) {
        return this.msgs.addError(err);
      }
      window.location.reload();
    });
  }

  signup(): any {
    if (this.user.password !== this.user.confirm_password) {
      return this.msgs.addError(`Password doesn't match`);
    }
    this.userService.signup(this.user, (err, res) => {
      if (err) {
        return this.msgs.addError(err);
      }
      this.msgs.addSuccess(res);
      this.login();
    });
  }

}

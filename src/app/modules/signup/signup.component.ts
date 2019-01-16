import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { MsgsService } from '../../shared/services/msgs.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {};
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
    this.userService.signup(this.user, (err, res) => {
      if (err) {
        return this.msgs.addError(err);
      }
      this.msgs.addSuccess(res);
      this.login();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signup(): any {
    let empty;
    Object.entries(this.user).map(att => {
      if (att[1] === undefined || att[1] === '') {
        empty = true;
      }
    });
    if (empty) {
      alert(`Complete all fields`);
      return;
    }
    if (this.user.password !== this.user.confirm_password) {
      alert(`Password doesn't mach`);
      return;
    }
    if (!this.terms_service) {
      alert(`Check Terms of Service`);
      return;
    }
    this.userService.signup(this.user, (err, res) => {
      if (err) {
        alert(err.error.message);
        return;
      }
      this.router.navigate(['/dashboard']);
    });
  }

}

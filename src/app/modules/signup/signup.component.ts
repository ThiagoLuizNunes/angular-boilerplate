import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

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

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService ) { }

  ngOnInit() {
  }

  signup(): any {
    let empty;
    const emailRegex = /\S+@\S+\.\S+/;
    Object.entries(this.user).map(att => {
      if (att[1] === undefined || att[1] === '') {
        empty = true;
      }
    });
    if (empty) {
      this.toastr.error(`Complete all fields`);
      return;
    }
    if (!this.user.email.match(emailRegex)) {
      this.toastr.error(`Invalid email`);
      return;
    }
    if (this.user.password !== this.user.confirm_password) {
      this.toastr.error(`Password doesn't mach`);
      return;
    }
    if (!this.terms_service) {
      this.toastr.error(`Check Terms of Service`);
      return;

    }
    this.authService.signup(this.user, (err, res) => {
      if (err) {
        this.toastr.error(err.error.message);
        return;
      }
      this.router.navigate(['/dashboard']);
    });
  }

  onKeydEnter(event: any) {
    this.signup();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { AuthFactory } from '../auth/auth.factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private authFactory: AuthFactory
  ) {}

  ngOnInit() {
  }

  login(): any {
    if (this.user.email === '' || this.user.password === '') {
      this.toastr.error(`Complete all fields`);
      return;
    }
    this.authService.login(this.user, (err, res) => {
      if (err) {
        console.log(err);
        this.toastr.error(err.error.message);
        return;
      }
      this.authFactory.setLocalStorage(res);
      this.router.navigate(['/dashboard']);
    });
  }

  onKeydEnter(event: any) {
    this.login();
  }
}

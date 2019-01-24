import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  login(): any {
    if (this.user.email === '' || this.user.password === '') {
      alert(`Complete all fields`);
      return;
    }
    this.authService.login(this.user, (err, res) => {
      if (err) {
        console.log(err);
        alert(err.error);
        return;
      }
      this.router.navigate(['/dashboard']);
    });
  }
}

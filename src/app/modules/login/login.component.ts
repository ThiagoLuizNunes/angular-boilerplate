import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  login(): any {
    if (this.user.email === '' || this.user.password === '') {
      alert(`Complete all fields`);
      return;
    }
    this.userService.login(this.user, (err, res) => {
      if (err) {
        alert(err.error.message);
        return;
      }
      this.router.navigate(['/dashboard']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onSubmit(form) {
    let empty;
    const emailRegex = /\S+@\S+\.\S+/;
    Object.entries(this.user).map(att => {
      if (att[1] === undefined || att[1] === '') {
        empty = true;
      }
    });
    if (empty || !this.user.password || !this.user.confirm_password) {
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
    console.log(this.user);
    console.log(form.value);
  }
}

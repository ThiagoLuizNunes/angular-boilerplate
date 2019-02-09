import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = true;
  user: any;

  constructor(
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.showMenu = true;
    } else {
      this.authService.isAuthenticated(this.user.access_token)
        .subscribe(
          data => {
            this.showMenu = false;
          },
          err => {
            this.user = null;
            this.showMenu = true;
            return;
          },
      );
    }
  }
  logout() {
    this.authService.logout();
    this.ngOnInit();
  }
}

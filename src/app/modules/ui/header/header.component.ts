import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AuthFactory } from '../../auth/auth.factory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = true;
  user: any;

  constructor(
    private authService: AuthService,
    private storage: AuthFactory) { }

  ngOnInit() {
    if (this.storage.getLocalStorage()) {
      this.authService.getUser()
        .subscribe(
          data => {
            this.user = data;
            this.showMenu = false;
          },
          err => {
            this.user = null;
            this.showMenu = true;
            return;
          }
      );
    } else {
      this.user = null;
      this.showMenu = true;
    }
  }
  logout() {
    this.authService.logout();
    this.ngOnInit();
  }
}

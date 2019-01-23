import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = true;
  user = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) {
      this.showMenu = false;
    }
  }
  logout = () => this.authService.logout();
}

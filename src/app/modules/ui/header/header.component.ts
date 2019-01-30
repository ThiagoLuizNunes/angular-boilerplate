import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = true;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    // this.route.data.subscribe();
    if (!this.user) {
      this.showMenu = true;
    } else {
      this.authService.isAuthenticated(this.user.access_token, (err, res) => {
        if (err) {
          this.user = null;
          this.showMenu = true;
          return;
        }
        this.showMenu = false;
      });
    }
  }
  logout() {
    this.authService.logout();
    this.ngOnInit();
  }
}

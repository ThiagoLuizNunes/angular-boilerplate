import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    console.log('OnInit')
    this.user = this.authService.getUser();
    // console.log(this.user)
    // this.user = this.route.data.subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

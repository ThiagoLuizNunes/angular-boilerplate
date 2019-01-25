import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    OverviewComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class DashboardModule { }

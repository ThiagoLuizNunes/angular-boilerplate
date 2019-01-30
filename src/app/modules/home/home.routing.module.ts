import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserDetailResolver } from 'src/app/core/guards/user.detail.guard';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent, resolve: { user: UserDetailResolver }, },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

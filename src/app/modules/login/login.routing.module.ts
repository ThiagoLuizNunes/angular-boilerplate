import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

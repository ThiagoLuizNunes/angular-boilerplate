import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';
import { SignupGuard } from 'src/app/core/guards/signup.guard';

const loginRoutes: Routes = [
  { path: '', component: SignupComponent, canActivate: [SignupGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }

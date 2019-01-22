import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { UserService } from '../user/user.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class LoginModule { }

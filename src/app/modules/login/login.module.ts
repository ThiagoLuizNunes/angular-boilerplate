import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup.routing.module';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [SignupComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    FormsModule,
    SignupRoutingModule,
  ]
})
export class SignupModule { }

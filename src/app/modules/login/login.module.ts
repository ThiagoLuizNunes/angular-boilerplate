import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { UserService } from '../user/user.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }

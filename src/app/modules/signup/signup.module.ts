import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';

import { ToastrModule } from 'ngx-toastr';
import { UserService } from '../user/user.service';

@NgModule({
  declarations: [SignupComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  exports: [SignupComponent]
})
export class SignupModule { }

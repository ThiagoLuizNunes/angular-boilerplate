import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [SignupComponent]
})
export class SignupModule { }

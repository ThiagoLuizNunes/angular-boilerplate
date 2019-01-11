import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { SignupFormsComponent } from './signup-forms/signup-forms.component';
import { SignupHeaderComponent } from './signup-header/signup-header.component';

@NgModule({
  declarations: [SignupComponent, SignupFormsComponent, SignupHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [SignupComponent]
})
export class SignupModule { }

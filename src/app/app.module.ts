import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { SignupModule } from './modules/signup/signup.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HomeModule,
    LoginModule,
    SignupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

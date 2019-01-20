import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './modules/home/home.module';

import { LoginModule } from './modules/login/login.module';
import { LoginRoutingModule } from './modules/login/login.routing.module';

import { SignupModule } from './modules/signup/signup.module';
import { SignupRoutingModule } from './modules/signup/signup.routing.module';

import { DashboardRoutingModule } from './modules/dashboard/dashboard.routing.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    SignupRoutingModule,
    DashboardRoutingModule,
    HomeModule,
    LoginModule,
    SignupModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { UiModule} from '../ui/ui.module';
import { HomeRoutingModule } from './home.routing.module';
import { UserDetailResolver } from 'src/app/core/guards/user.detail.guard';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    UiModule,
  ],
  providers: [UserDetailResolver]
})
export class HomeModule { }

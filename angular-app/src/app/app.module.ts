import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { FormsModule} from '@angular/forms'; //
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './sharedcomponents/navbar/navbar.component';
import { FooterComponent } from './sharedcomponents/footer/footer.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { TrainersComponent } from './components/trainers/trainers.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserProfileComponent,
    AdminProfileComponent,
    TrainerProfileComponent,
    TrainersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

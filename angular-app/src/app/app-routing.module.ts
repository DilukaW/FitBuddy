import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"trainers",component:TrainersComponent},
  {path:"login",component:UserLoginComponent},
  {path:"register",component:UserSignupComponent},
  {path:"profile",component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { NavExercisesComponent } from './components/nav-exercises/nav-exercises.component';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BmiComponent } from './components/bmi/bmi.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"trainersDetails",component:TrainersComponent,data: {title: 'Fit Buddy-Trainers'}},
  {path:"login",component:UserLoginComponent,data: {title: 'Fit Buddy-Login'}},
  {path:"register",component:UserSignupComponent,data: {title: 'Fit Buddy-Register'}},
  {path:"bmi",component:BmiComponent,data: {title: 'Fit Buddy-BMI'}},
  {path:"aboutUs",component:AboutUsComponent,data: {title: 'Fit Buddy-About'}},
  {path:"user/profile",component:UserProfileComponent,data: {title: 'Fit Buddy-User/Dashboard'}},
  {path:"admin/profile",component:AdminProfileComponent,data: {title: 'Fit Buddy-Admin/Dashboard'}},
  {path:"trainer/profile",component:TrainerProfileComponent,data: {title: 'Fit Buddy-Trainer/Dashboard'}},
  {path:"allExercises",component:ExercisesComponent,data: {title: 'Fit Buddy-AllExercises'}},
  {path:"exercise",component:NavExercisesComponent,data: {title: 'Fit Buddy-Exercises'}},
  {path:"exerciseDetails",component:ExerciseDetailsComponent,data: {title: 'Fit Buddy-ExerciseDetails'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

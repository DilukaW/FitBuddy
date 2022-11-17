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

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"trainersDetails",component:TrainersComponent},
  {path:"login",component:UserLoginComponent},
  {path:"register",component:UserSignupComponent},
  {path:"user/profile",component:UserProfileComponent},
  {path:"admin/profile",component:AdminProfileComponent},
  {path:"trainer/profile",component:TrainerProfileComponent},
  {path:"allExercises",component:ExercisesComponent},
  {path:"exercise",component:NavExercisesComponent},
  {path:"exerciseDetails",component:ExerciseDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

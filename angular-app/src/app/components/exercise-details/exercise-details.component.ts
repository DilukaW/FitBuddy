import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from 'express';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css'],
})
export class ExerciseDetailsComponent implements OnInit {
  //params
  sub: any;
  id: any;

  //exercise
  exercise: any;
  gif:any
  exerciseName:any
  exerciseMussel:any
  exerciseTarget:any
  exerciseEquipment:any
  exerciseBodyPart:any

  exerciseByEquipment: any[] = [];
  exerciseByMussel: any[] = [];

  //messages
  showErrorsMsg!: boolean;
  errorMsg!: String;
  
  constructor(
    private api: ApiService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    //getting params from previous route
    this.sub = this.aRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });

    this.getExercise();
  }

  //refresh page
  refresh() {
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  //get exercise details by id
  getExercise() {
    this.api.getExerciseById(this.id).subscribe({
      next: (res) => {
        if (res.success) {
          //console.log(res.data);
          this.exercise = res.data;
          this.gif=this.exercise.gifUrl
          this.exerciseName=this.exercise.name
          this.exerciseTarget=this.exercise.target
          this.exerciseEquipment=this.exercise.equipment
          this.exerciseBodyPart=this.exercise.bodyPart
          $('.spinnerExercise').css('visibility', 'hidden');
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        }
      },
      error: (err) => {
         this.showErrorsMsg = true;
         this.errorMsg = 'Server Error';
         setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {
        this.getEquipmentExercises();
        this.getTargetExercises();
      },
    });
  }

  //get similar equipment exercises
  getEquipmentExercises() {
    this.api.getExercisesByEquipment(this.exercise.equipment).subscribe({
      next: (res) => {
        if (res.success) {
          //console.log(res.data);
          this.exerciseByEquipment = res.data;
          $('.spinnerEquipment').css('visibility', 'hidden');
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 2000);
      },
      complete: () => {},
    });
  }

  //get similar target mussel exercises
  getTargetExercises() {
    this.api.getExercisesByMussel(this.exercise.target).subscribe({
      next: (res) => {
        if (res.success) {
          //console.log(res.data);
          $('.spinnerMussel').css('visibility', 'hidden');
          this.exerciseByMussel = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-exercise-section',
  templateUrl: './exercise-section.component.html',
  styleUrls: ['./exercise-section.component.css'],
})
export class ExerciseSectionComponent implements OnInit {
  //arrays
  bodyParts: any[] = [];
  allExercises: any[] = [];
  selectedBodyPart: any = 0;
  type: string = 'All Exercises';

  //messages
  showErrorsMsg!: boolean;
  errorMsg!: String;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBodyParts();
    this.getAllExercise();

    //console.log('selected ' + this.selectedBodyPart);
  }

  //style
  isActive(item: any) {
    return this.selectedBodyPart === item;
  }

  // get bodyparts
  getAllBodyParts() {
    this.api.getBodyParts().subscribe({
      next: (res) => {
        if (res.success) {
          this.bodyParts = res.data;
          this.hideBodyPartsSpinner();
          //console.log(res.data);
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

  //get all exercises
  getAllExercise() {
    this.api.getAllExercises().subscribe({
      next: (res) => {
        if (res.success) {
          this.allExercises = res.data;
          this.hideExercisesSpinner();
          //console.log(res.data);
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

  //show specific bodyparts exercise
  getSpecificExercise(item: any) {
    this.allExercises = [];

    this.showExercisesSpinner();
    //adding style for selected trainer
    this.selectedBodyPart = item;
    this.api.getExercisesByBodyPart(this.selectedBodyPart).subscribe({
      next: (res) => {
        if (res.success) {
          //console.log(res.data);
          this.hideExercisesSpinner();
          this.allExercises = res.data;
          this.type = item + ' Exercises';
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

  //hide loading BodyParts spinner
  hideBodyPartsSpinner() {
    $('.spinnerBody').css('visibility', 'hidden');
  }

  //hide loading Exercises spinner
  hideExercisesSpinner() {
    $('.spinnerExercises').css('visibility', 'hidden');
  }

  //show loading BodyParts spinner
  showBodyPartsSpinner() {
    $('.spinnerBody').css('visibility', 'visible');
  }

  //show loading Exercises spinner
  showExercisesSpinner() {
    $('.spinnerExercises').css('visibility', 'visible');
  }
}

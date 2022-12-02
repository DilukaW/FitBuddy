import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-section',
  templateUrl: './exercise-section.component.html',
  styleUrls: ['./exercise-section.component.css'],
})
export class ExerciseSectionComponent implements OnInit {
  bodyParts: any[] = [];
  allExercises: any[] = [];
  selectedBodyPart: any = 0;
  type: string = 'All Exercises';

  //messages
  showErrorsMsg!: boolean;
  errorMsg!: String;

  constructor(private api: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.getAllBodyParts();
    this.getAllExercise();
    console.log('selected ' + this.selectedBodyPart);
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
          console.log(res.data);
        } 
        else{
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000)
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = "Server Error";
        setTimeout(() => (this.showErrorsMsg = false), 4000)
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
          console.log(res.data);
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = "Server Error";
        setTimeout(() => (this.showErrorsMsg = false), 4000)
      },
      complete: () => {},
    });
  }

  //show specific bodyparts exercise
  getSpecificExercise(item: any) {
    this.allExercises = [];

    //adding style for selected trainer
    this.selectedBodyPart = item;
    this.api.getExercisesByBodyPart(this.selectedBodyPart).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);

          this.allExercises = res.data;
          this.type = item + ' Exercises';
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = "Server Error";
        setTimeout(() => (this.showErrorsMsg = false), 4000)
      },
      complete: () => {},
    });
  }


}

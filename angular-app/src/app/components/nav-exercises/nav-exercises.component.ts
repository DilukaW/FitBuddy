import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-nav-exercises',
  templateUrl: './nav-exercises.component.html',
  styleUrls: ['./nav-exercises.component.css'],
})
export class NavExercisesComponent implements OnInit {
  backExercises: any[] = [];
  cardioExercises: any[] = [];
  upperLegsExercises: any[] = [];
  upperArmsExercises: any[] = [];
  shouldersExercises: any[] = [];
  lowerLegsExercises: any[] = [];
  lowerArmsExercises: any[] = [];
  chestExercises: any[] = [];
  neckExercises: any[] = [];
  waistExercises: any[] = [];

  //messages
  showErrorsMsg!: boolean;
  errorMsg!: String;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getSpecificExercise();
  }

  //navigating from nav to exercise page
  getSpecificExercise() {
    this.api.getExercisesByBodyPart('back').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerBack').css('visibility', 'hidden');
          this.backExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
     
      },
    });
    this.api.getExercisesByBodyPart('cardio').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerCardio').css('visibility', 'hidden');
          this.cardioExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
      
      },
    });
    this.api.getExercisesByBodyPart('chest').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerChest').css('visibility', 'hidden');
          this.chestExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
      
      },
    });
    this.api.getExercisesByBodyPart('waist').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerWaist').css('visibility', 'hidden');
          this.waistExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        
      },
    });
    this.api.getExercisesByBodyPart('neck').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerNeck').css('visibility', 'hidden');
          this.neckExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        
      },
    });
    this.api.getExercisesByBodyPart('upper arms').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerUpperArms').css('visibility', 'hidden');
          this.upperArmsExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        
      },
    });
    this.api.getExercisesByBodyPart('upper legs').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerUpperLegs').css('visibility', 'hidden');
          this.upperLegsExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        
      },
    });
    this.api.getExercisesByBodyPart('lower arms').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerLowerArms').css('visibility', 'hidden');
          this.lowerArmsExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        
      },
    });
    this.api.getExercisesByBodyPart('lower legs').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerLowerLegs').css('visibility', 'hidden');
          this.lowerLegsExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
     
      },
    });
    this.api.getExercisesByBodyPart('shoulders').subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          $('.spinnerShoulder').css('visibility', 'hidden');
          this.shouldersExercises = res.data;
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        this.showErrorsMsg = true;
        this.errorMsg = 'Server Error';
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
        
      },
    });
  }
}

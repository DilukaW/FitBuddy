import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  constructor(private api:ApiService,private aRoute:ActivatedRoute) { }
  sub:any;
  id:any; 
  exercise:any;
   //messages
   showErrorsMsg!: boolean;
   errorMsg!: String;
 

  ngOnInit(): void {
      //getting params from previous route
      this.sub=this.aRoute.queryParams.subscribe(params => { 
      
        this.id = params['id']; 
        
   });

   this.getExercise();
  }

  getExercise(){
    this.api.getExerciseById(this.id).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data)
          this.exercise=res.data;

       
        } else {
          this.showErrorsMsg = true;
          this.errorMsg = res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

}

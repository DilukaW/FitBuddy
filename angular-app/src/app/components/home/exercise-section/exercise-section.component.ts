import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-exercise-section',
  templateUrl: './exercise-section.component.html',
  styleUrls: ['./exercise-section.component.css']
})
export class ExerciseSectionComponent implements OnInit {

  bodyParts:any[]=[];
  allExercises:any[]=[];
  selectedBodyPart:any=0;
  type:string="All Exercises"

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getAllBodyParts();
    this.getAllExercise();
    //this.getX();
  }

  getAllBodyParts(){
    this.api.getBodyParts().subscribe({
      next: (res) => {
        if (res.success) {
          this.bodyParts=res.data;
        console.log(res.data)
        }
      },
      error: (err) => {
        
      },
      complete: () => {
       
      },
    });
  }

  getAllExercise(){
    this.api.getAllExercises().subscribe({
      next: (res) => {
        if (res.success) {
          this.allExercises=res.data;
        console.log(res.data)
        }
      },
      error: (err) => {
        
      },
      complete: () => {
       
      },
    });

  }

getExerciseByBodyPart(){
  

   
  

}

  getSpecificExercise(item:any){
    this.allExercises=[];
    
   //adding style for selected trainer
  this.selectedBodyPart = item;
 this.api.getExercisesByBodyPart(this.selectedBodyPart).subscribe({
   next: (res) => {
     if (res.success) {
      console.log(res.data)
      
      this.allExercises=res.data;
      this.type=item+" Exercises";
          

     }
   },
   error: (err) => {
        
   },
   complete: () => {
       
   },
 });
    
}
isActive(item:any){
     return this.selectedBodyPart === item;
     }
}

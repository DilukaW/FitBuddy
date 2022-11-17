import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  //params
  sub:any;
  id:any;
  type:any;

  //messages
  showErrorsMsg!: boolean;
  errorMsg!: String;



  allExercises:any[]=[];
  
  
  

  waistExercises:any[]=[];

  constructor(private api:ApiService,private aRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    //getting params from previous route
    this.sub=this.aRoute.queryParams.subscribe(params => { 
      
       this.id = params['id']; 
       this.type = params['type']; 
       
  });
  console.log( 'q'+this.id)
  
  this.getExercises();
}

// displaying exercises
getExercises(){

  

  //navigating from home banner to exercise page
  if(this.id==0){
    this.allExercises=[];
    this.api.getAllExercises().subscribe({
      next: (res) => {
        if (res.success) {
          this.allExercises=res.data;
        console.log(res.data)
        }
        else{
          this.showErrorsMsg = true;
          this.errorMsg=res.message;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: (err) => {
        
      },
      complete: () => {
       
      },
    });
  }
  else{
    this.allExercises=[];

  this.api.getExercisesByBodyPart(this.id).subscribe({
    next: (res) => {
      if (res.success) {
       console.log(res.data)
       
       this.allExercises=res.data;
 
      }
      else{
        this.showErrorsMsg = true;
        this.errorMsg=res.message;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      }
    },
    error: (err) => {
         
    },
    complete: () => {
        
    },
  });
  }
}


}

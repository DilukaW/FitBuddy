import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  bodyParts:any[]=[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getAllBodyParts()
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

}

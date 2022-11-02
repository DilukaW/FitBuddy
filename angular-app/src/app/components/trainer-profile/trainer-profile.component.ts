import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {

  data:any
  constructor(private trainerService:TrainerService) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails() {
    this.trainerService.getTrainerProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
        }
        else{
          
        }
      },
      error: (err) => {},
      complete: () => {
        
      },
    });
  }
}

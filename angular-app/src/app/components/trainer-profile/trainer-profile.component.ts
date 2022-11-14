import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {

  // messages
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  //profile image
  imageData!:string
  profileImg!:string;

    // tab controls
    tab: any;
    activeTab: string = 'enrolled trainees';

  data:any

  constructor(private trainerService:TrainerService) { }

  ngOnInit(): void {
    this.getDetails()
   
  }
  // tab function
onTabClick(tab: string) {
  this.activeTab = tab;
 
}
//get user details
getDetails() {
  this.trainerService.getTrainerProfile().subscribe({
    next: (res) => {
      if (res.success) {
        this.data = res.data;
        
        
         this.profileImg=this.data.image;

      }
      else{
        
      }
    },
    error: (err) => {
      
    },
    complete: () => {
      
    },
  });
}

  
}

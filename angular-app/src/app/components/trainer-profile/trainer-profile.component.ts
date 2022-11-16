import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { UserService } from 'src/app/shared/auth/user.service';

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

  //user
  users:any[]=[];
  usersIds:any[]=[];
  selected: any = 0;
  updateUserImg:any;
  ids:any;
  selectedUserId :any;
  uname:any;
  email:any;
  gender:any;
  age:any;
  userImg:any;


  constructor(private trainerService:TrainerService,private userService:UserService) { }

  ngOnInit(): void {
    
    this.getDetails();
  
    
   
  }

// tab function
onTabClick(tab: string) {
  this.activeTab = tab;
 
  this.getUsers();
 
  
 
}
//get user details
 getDetails() {
  this.trainerService.getTrainerProfile().subscribe({
    next: (res) => {
      if (res.success) {
        this.data = res.data;
        this.profileImg=this.data.image;
        this.ids = this.data.traineesId;
        console.log("ids"+this.ids);

      }
      else{
        
      }
    },
    error: (err) => {
      
    },
    complete: () => {
      this.getUsers()
    },
  });
  
}


// function for style selected trainer
 isActive(item: any) {
  return this.selected === item;
}

//get selected trainer details
getUser(_id: string, item: any) {
  this.selectedUserId = _id;

  //adding style for selected trainer
  this.selected = item;
  this.userService.getUserById(_id).subscribe({
    next: (res) => {
      if (res.success) {
        this.email = res.data.email;
        this.uname = res.data.uname;
        this.gender = res.data.gender;
        this.age = res.data.age;
        this.userImg = res.data.image;
      }
    },
    error: (err) => {
      this.errorMsg = 'Server Error';
      this.showErrorsMsg = true;
      setTimeout(() => (this.showErrorsMsg = false), 4000);
    },
    complete: () => {
   
    },
  });
}

 //get user enrolled trainers
  getUsers() {
  
  this.usersIds = [];

  for (let i = 0; i < this.ids.length; i++) {
    this.usersIds.push(this.ids[i].split('_').pop());
  }

  this.users = [];
  for (let j = 0; j < this.usersIds.length; j++) {
    this.userService.getUserById(this.usersIds[j]).subscribe({
      next: (res) => {
        if (res.success) {
          this.users.push(res.data);
          this.uname = this.users[0].uname;
          this.email = this.users[0].email;
          this.age = this.users[0].age;
          this.gender = this.users[0].gender;
          this.userImg = this.users[0].image;
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
       
      },
    });
  }


}
}

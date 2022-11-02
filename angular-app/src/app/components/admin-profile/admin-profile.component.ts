import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  trainerUpdateForm!:FormGroup;
  trainers:any[]=[];
  data:any;
  tab:any;
  selected :any=0;
  activeTab:string='add user';
  showSuccessMsg!: boolean;
  errorMsg!: String;
  trainer:any;
  uname:any;
  email:any;
  area:any;
  des:any;

  constructor(private adminService:AdminService,private trainerService:TrainerService) { }

  ngOnInit(): void {

    this.getDetails();
    this.getTrainers();

    
    // from validation
    this.trainerUpdateForm = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      area: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    
  }

 

  // get admin details
  getDetails() {
    this.adminService.getAdminProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  // get all trainers
  getTrainers(){
    this.trainerService.getAllTrainers().subscribe({
      next: (res) => {
        if (res.success) {
          this.trainers = res.data;
          this.uname=this.trainers[0].uname
          this.email=this.trainers[0].email
          this.area=this.trainers[0].area
          this.des=this.trainers[0].description
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  
  // get trainer
  getTrainer(_id:string,item: any){

    //adding style for selected trainer
    this.selected = item; 
    this.trainerService.getTrainerById(_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.trainer = res.data;
          this.uname=this.trainer.uname
          this.email=this.trainer.email
          this.area=this.trainer.area
          this.des=this.trainer.description
        
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  // logout function
  logOut(){
    sessionStorage.clear();
  }

  // lab function
  onTabClick(tab: string){
    this.activeTab=tab;
  }

  // data submit function
  onSubmit(form:FormGroup){

    console.log(this.trainerUpdateForm.value)
    this.trainerService.registerTrainer(form.value).subscribe({
      next: (res) => {
        this.showSuccessMsg = true;
        setTimeout(() => (this.showSuccessMsg = false), 4000);
        
      },
      error: (err) => {
        if (err.status == 422) {
          this.errorMsg = err.error.join('<br/>');
          setTimeout(() => (this.errorMsg = ''), 4000);
        } else {
          this.errorMsg = 'Some thing went wrong !';
        }
      },
      complete: () => {
        this.restForm(form);
      },
    });

  }

  // reset form field values
  restForm(form: FormGroup) {
    this.trainerService.selectedTrainer = {
      _id:" ",
      uname:" ",
      email:" ",
      area:" ",
      description:" ",
      password:" ",
    };
    form.reset();
    this.errorMsg = '';
  }

// function for style selected trainer
  isActive(item: any) {
    return this.selected === item;
  }
}

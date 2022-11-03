import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  // declaring forms
  trainerUpdateForm!: FormGroup;
  updateForm!: FormGroup;

  // save data
  trainers: any[] = [];
  trainer: any;
  data: any;

  // tab controls
  tab: any;
  activeTab: string = 'add user';

  // selected trainer
  selected: any = 0;
  selectedTrainerId: any;

  // messages
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  // form controls
  uname: any;
  email: any;
  
 
  area: any;
  des: any;

  constructor(
    private adminService: AdminService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.getDetails();
    this.getTrainers();
  

    // add trainer from validation
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

    // update trainer from validation
    this.updateForm = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      area: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
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
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {},
    });
  }

  // get all trainers
  getTrainers() {
    this.trainerService.getAllTrainers().subscribe({
      next: (res) => {
        if (res.success) {
          this.trainers = res.data;
          this.uname = this.trainers[0].uname;
          this.email = this.trainers[0].email;
          this.area = this.trainers[0].area;
          this.des = this.trainers[0].description;

          this.selectedTrainerId = this.trainers[0]._id;
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {},
    });
  }

  // get single trainer
  getTrainer(_id: string, item: any) {
    this.selectedTrainerId = _id;

    //adding style for selected trainer
    this.selected = item;
    this.trainerService.getTrainerById(_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.trainer = res.data;
          this.uname = this.trainer.uname;
          this.email = this.trainer.email;
          this.area = this.trainer.area;
          this.des = this.trainer.description;
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {},
    });
  }

  // logout function
  logOut() {
    sessionStorage.clear();
  }

  // tab function
  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  // add trainer data submit function
  onSubmit(form: FormGroup) {
    console.log(this.trainerUpdateForm.value);
    this.trainerService.registerTrainer(form.value).subscribe({
      next: (res) => {
        this.successMsg = 'New trainer added successfully!';
        this.showSuccessMsg = true;
        setTimeout(() => (this.showSuccessMsg = false), 4000);

        this.getTrainers();
      },
      error: (err) => {
        if (err.status == 422) {
          this.errorMsg = err.error.join('<br/>');
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        } else {
          this.errorMsg = 'Some thing went wrong !';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      complete: () => {
        this.restForm(form);
      },
    });
  }

  // update trainer data submit
 update(form: FormGroup) {
    console.log(this.updateForm.value);
    this.trainerService
      .updateTrainerById(this.selectedTrainerId, form.value)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.successMsg = 'Trainer Details Updated Successfully';
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
        
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 4000);
          }
        },
        error: () => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        },
        complete: () => {
        
          this.getTrainers();
          this.selected = 0;
        },
      });
  }

  // delete trainer function
  deleteTrainer(_id: string){
    this.trainerService
    .deleteTrainerById(_id)
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.successMsg = 'Trainer DeletedSuccessfully';
          this.showSuccessMsg = true;
          setTimeout(() => (this.showSuccessMsg = false), 4000);
      
        } else {
          this.errorMsg = res.message;
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        }
      },
      error: () => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 4000);
      },
      complete: () => {
      
        this.getTrainers();
        this.selected = 0;
      },
    });
  }
  // reset form field values
  restForm(form: FormGroup) {
    this.trainerService.selectedTrainer = {
      _id: ' ',
      uname: ' ',
      email: ' ',
      area: ' ',
      description: ' ',
      password: ' ',
    };
    form.reset();
    this.errorMsg = '';
  }

  // function for style selected trainer
  isActive(item: any) {
    return this.selected === item;
  }
}

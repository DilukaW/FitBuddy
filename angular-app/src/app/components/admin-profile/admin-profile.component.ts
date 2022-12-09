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

   //profile image
  selectedAdminId:any;
  updateTrainerImg!:string

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
          this.selectedAdminId=this.data._id
          console.log(this.selectedAdminId)
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
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
          this.updateTrainerImg=this.trainers[0].image

          this.selectedTrainerId = this.trainers[0]._id;
         
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
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
          this.updateTrainerImg=this.trainer.image
        }
      },
      error: (err) => {
        this.errorMsg = 'Server Error';
        this.showErrorsMsg = true;
        setTimeout(() => (this.showErrorsMsg = false), 2000);
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
    $('#spinnerAdd').removeClass('visually-hidden')
    $('#btnAdd').addClass('visually-hidden')

    console.log(this.trainerUpdateForm.value);
    this.trainerService.registerTrainer(form.value).subscribe({
      next: (res) => {
        this.successMsg = 'New trainer added successfully!';
        this.showSuccessMsg = true;
        setTimeout(() => (this.showSuccessMsg = false), 2000);

        this.getTrainers();
      },
      error: (err) => {
        if (err.status == 422) {
          this.errorMsg = err.error.join('<br/>');
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        } else {
          this.errorMsg = 'Some thing went wrong !';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        }
      },
      complete: () => {
        $('#spinnerAdd').addClass('visually-hidden')
        $('#btnAdd').removeClass('visually-hidden')
        this.restForm(form);
      },
    });
  }

  // update trainer data submit
 update(form: FormGroup) {
  $('#spinnerUpdate').removeClass('visually-hidden')
  $('#btnUpdate').addClass('visually-hidden')

  const formData=new FormData();
    console.log(this.updateForm.value);
    formData.append('file',this.updateTrainerImg);
     formData.append('uname',form.controls['uname'].value);
     formData.append('email',form.controls['email'].value);
     formData.append('area',form.controls['area'].value);
    formData.append('description',form.controls['description'].value);
    this.trainerService
      .updateTrainerById(this.selectedTrainerId, formData,formData)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.successMsg = 'Trainer Details Updated Successfully';
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 2000);
        
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 2000);
          }
        },
        error: () => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        },
        complete: () => {
          $('#spinnerUpdate').addClass('visually-hidden')
          $('#btnUpdate').removeClass('visually-hidden')
        
          this.getTrainers();
          this.selected = 0;
        },
      });
  }

  // delete trainer function
  deleteTrainer(_id: string){
    if(confirm("Confirm deletion")==true){
      this.trainerService
      .deleteTrainerById(_id)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.successMsg = 'Trainer DeletedSuccessfully';
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 2000);
        
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 2000);
          }
        },
        error: () => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        },
        complete: () => {
        
          this.getTrainers();
          this.trainers=[];
          this.selected = 0;
        },
      });
    }
    
  }

  //update trainer image
  updateTrainerImage(event:Event){
    const file=(event.target as HTMLInputElement).files![0];
    this.updateForm.patchValue({image:file});
    const allowedType=["image/png","image/jpeg","image/jpg"];

   if(file &&allowedType.includes(file.type)){
    const reader=new FileReader();
    reader.onload=()=>{
      this.updateTrainerImg=reader.result as string;
    }
    reader.readAsDataURL(file);
   }

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
      image:' '
    };
    form.reset();
    this.errorMsg = '';
  }

  // function for style selected trainer
  isActive(item: any) {
    return this.selected === item;
  }
}

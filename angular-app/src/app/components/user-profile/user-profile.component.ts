import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/auth/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userUpdateForm!: FormGroup;

  // messages
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  // tab controls
  tab: any;
  activeTab: string = 'update user';

  // user data
  data: any;
  selectedUserId: any;
  email: any;
  uname: any;
  gender: any;
  age!: Number;

  //profile image
  imageData!: string;
  profileImg!: string;

  loaded: boolean = false;

  //trainers
  selected: any = 0;
  trainers: any[] = [];
  ids: any[] = [];
  trainersIds: any[] = [];
  selectedTrainerId: any;
  unameTrainer: any;
  emailTrainer: any;
  areaTrainer: any;
  desTrainer: any;
  updateTrainerImg: any;

  constructor(
    private userService: UserService,
    private trainerService: TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDetails();
    this.getTrainers();

    // form validation
    this.userUpdateForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      uname: new FormControl('', [Validators.required]),
      age: new FormControl(Number(null), [Validators.required]),

      gender: new FormControl(''),
    });

    //this.userUpdateForm.get('gender')?.setValue('Male');
  }

  changeType(e: any) {
    this.userUpdateForm.get('gender')!.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // tab function
  onTabClick(tab: string) {
    this.activeTab = tab;
    this.getDetails();
    this.getTrainers();
  }

  // update user data submit
  update(form: FormGroup) {
    const formData = new FormData();
    formData.append('file', this.imageData);
    formData.append('uname', form.controls['uname'].value);
    formData.append('email', form.controls['email'].value);
    formData.append('age', form.controls['age'].value);
    formData.append('gender', form.controls['gender'].value);
    console.log(this.userUpdateForm.value);
    this.userService
      .updateUserById(this.selectedUserId, formData, formData)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.successMsg = 'User Details Updated Successfully';
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
          this.getDetails();
        },
      });
  }

  //profile image upload function
  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.userUpdateForm.patchValue({ image: file });
    const allowedType = ['image/png', 'image/jpeg', 'image/jpg'];

    if (file && allowedType.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  //get user details
  getDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;

          this.email = this.data.email;
          this.uname = this.data.uname;
          this.gender = this.data.gender;
          this.age = this.data.age;
          this.imageData = this.data.image;
          this.ids = this.data.trainersId;

          this.selectedUserId = this.data._id;

          this.userUpdateForm.get('gender')?.setValue(this.data.gender);
          this.profileImg = this.data.image;
          console.log('Ids ' + this.ids);
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  //get selected trainer details
  getTrainer(_id: string, item: any) {
    this.selectedTrainerId = _id;

    //adding style for selected trainer
    this.selected = item;
    this.trainerService.getTrainerById(_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.unameTrainer = res.data.uname;
          this.emailTrainer = res.data.email;
          this.areaTrainer = res.data.area;
          this.desTrainer = res.data.description;
          this.updateTrainerImg = res.data.image;
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

  //get user enrolled trainers
  getTrainers() {
    this.trainersIds = [];

    for (let i = 0; i < this.ids.length; i++) {
      this.trainersIds.push(this.ids[i].split('_').pop());
    }

    this.trainers = [];
    for (let j = 0; j < this.trainersIds.length; j++) {
      this.trainerService.getTrainerById(this.trainersIds[j]).subscribe({
        next: (res) => {
          if (res.success) {
            this.trainers.push(res.data);
            this.unameTrainer = this.trainers[0].uname;
            this.emailTrainer = this.trainers[0].email;
            this.areaTrainer = this.trainers[0].area;
            this.desTrainer = this.trainers[0].description;
            this.updateTrainerImg = this.trainers[0].image;
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

    console.log('trainersIds ' + this.trainersIds);
    console.log('trainers ' + this.trainers);
    console.log('uname' + this.unameTrainer);
  }

  // reset form field values
  restForm(form: FormGroup) {
    this.userService.selectedRegUser = {
      _id: ' ',
      uname: ' ',
      gender: ' ',
      age: Number(null),
      email: ' ',
      password: ' ',
      image: ' ',
    };
    form.reset();
    this.userUpdateForm.get('gender')?.setValue('Male');
    this.imageData = '';
  }
  // function for style selected trainer
  isActive(item: any) {
    return this.selected === item;
  }
}

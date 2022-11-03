import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/auth/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedUserId:any;
  email:any;
  uname:any;
  gender:any;
  age!:Number;

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    this.getDetails();  

    // form validation
    this.userUpdateForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      uname: new FormControl('', [Validators.required]),
      age: new FormControl(Number(null), [Validators.required,]),

      gender: new FormControl(''),
    });

    this.userUpdateForm.get('gender')?.setValue('Male');
   
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
}

// update user data submit
  update(form: FormGroup) {
    console.log(this.userUpdateForm.value);
    this.userService
      .updateUserById(this.selectedUserId, form.value)
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

  getDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
          
           this.email=this.data.email;
           this.uname=this.data.uname;
           this.gender=this.data.gender;
           this.age=this.data.age;

           this.selectedUserId=this.data._id;

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
  logOut(){
    
    localStorage.clear();
    this.router.navigate(['/login']);
  }

    // reset form field values
    restForm(form: FormGroup) {
      this.userService.selectedRegUser = {
        _id:" ",
        uname:" ",
        gender:" ",
        age:Number(null),
        email:" ",
        password:" ",
      };
      form.reset();
      this.userUpdateForm.get('gender')?.setValue('Male');
   
    }
}

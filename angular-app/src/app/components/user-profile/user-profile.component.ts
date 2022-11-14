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
  

  //profile image
  imageData!:string
  profileImg!:string;

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
}

// update user data submit
  update(form: FormGroup) {
    const formData=new FormData();
    formData.append('file',this.imageData);
    formData.append('uname',form.controls['uname'].value);
    formData.append('email',form.controls['email'].value);
    formData.append('age',form.controls['age'].value);
    formData.append('gender',form.controls['gender'].value);
    console.log(this.userUpdateForm.value);
    this.userService
      .updateUserById(this.selectedUserId,formData,formData)
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
  onImageSelect(event:Event){
    const file=(event.target as HTMLInputElement).files![0];
    this.userUpdateForm.patchValue({image:file});
    const allowedType=["image/png","image/jpeg","image/jpg"];

   if(file &&allowedType.includes(file.type)){
    const reader=new FileReader();
    reader.onload=()=>{
      this.imageData=reader.result as string;
    }
    reader.readAsDataURL(file);
   }



    

  }

  //get user details
  getDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
          
           this.email=this.data.email;
           this.uname=this.data.uname;
           this.gender=this.data.gender;
           this.age=this.data.age;
           this.imageData=this.data.image
           this.selectedUserId=this.data._id;

           this.userUpdateForm.get('gender')?.setValue(this.data.gender);
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
 

    // reset form field values
    restForm(form: FormGroup) {
      this.userService.selectedRegUser = {
        _id:" ",
        uname:" ",
        gender:" ",
        age:Number(null),
        email:" ",
        password:" ",
        image:" "
      };
      form.reset();
      this.userUpdateForm.get('gender')?.setValue('Male');
      this.imageData="";
    }
}

import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/auth/user.service';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { Router } from '@angular/router';
import { any } from 'webidl-conversions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  showSuccessMsg!: boolean;
  errorMsg!: String;
  showErrorsMsg!: boolean;
 

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private trainerService:TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      type: new FormControl(''),
    });
    this.loginForm.get('type')?.setValue(1);
  }

  
  changeType(e: any) {
    this.loginForm.get('type')!.setValue(e.target.value, {
      onlySelf: true,
    });
  }

 onSubmit(form:FormGroup) {

    //login for user
   if (form.get('type')?.value == 1) {
      const data = form.value;
      delete data['type'];
      this.userService.loginUser(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
            sessionStorage.setItem('user-token', res.token);
            
          } else {
            this.errorMsg = res.message
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 4000);
          }
        },
        error: (err) => {
          this.errorMsg = "Server Error";
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        },
        complete: async() => {
          this.restForm(form)
          await this.router.navigate(['user/profile']);
          window.location.reload()


        },
      });
    } 
    
    //login for trainer
    else if (form.get('type')?.value == 2) {
      console.log(2);
      const data = form.value;
      delete data['type'];
      this.trainerService.loginTrainer(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
            sessionStorage.setItem('trainer-token', res.token);
            this.router.navigate(['trainer/profile']);
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 4000);
          }
        },
        error: (err) => {
          this.errorMsg = "Server Error";
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        },
        complete:async () => {
          this.restForm(form)
          await this.router.navigate(['trainer/profile']);
          window.location.reload()

        },
      });
      
    } 
    
    //login for admin
    else {
      console.log(3);
      const data = form.value;
      delete data['type'];
      this.adminService.loginAdmin(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
            sessionStorage.setItem('admin-token', res.token);
            
     
            
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 4000);
          }
        },
        error: (err) => {
          this.errorMsg = "Server Error";
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 4000);
        },
        complete: async() => {
          this.restForm(form)
         await this.router.navigate(['admin/profile']);
          window.location.reload();
        },
      });
    }
  }

  // reset form field values
  restForm(form: FormGroup) {
    this.userService.selectedUser = {
      _id: '',
      uname: ' ',
      email: ' ',
      password: ' ',
    };
    form.reset();
    this.loginForm.get('type')?.setValue(1);
    
  }
  
}

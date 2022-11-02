import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/auth/user.service';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  showSuccessMsg!: boolean;
  errorMsg!: String;
 

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

  onSubmit() {

    //login for user
    if (this.loginForm.get('type')?.value == 1) {
      const data = this.loginForm.value;
      delete data['type'];
      this.userService.loginUser(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
            sessionStorage.setItem('token', res.token);
            this.router.navigate(['user/profile']);
          } else {
            this.errorMsg = res.message;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
          }
        },
        error: (err) => {
          alert('failed');
        },
        complete: () => {},
      });
    } 
    
    //login for trainer
    else if (this.loginForm.get('type')?.value == 2) {
      console.log(2);
      const data = this.loginForm.value;
      delete data['type'];
      this.trainerService.loginTrainer(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
            sessionStorage.setItem('token', res.token);
            this.router.navigate(['trainer/profile']);
          } else {
            this.errorMsg = res.message;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
          }
        },
        error: (err) => {
          alert('failed');
        },
        complete: () => {},
      });
      
    } 
    
    //login for admin
    else {
      console.log(3);
      const data = this.loginForm.value;
      delete data['type'];
      this.adminService.loginAdmin(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
            sessionStorage.setItem('token', res.token);
            
            this.router.navigate(['admin/profile']);
            
            
          } else {
            this.errorMsg = res.message;
            setTimeout(() => (this.showSuccessMsg = false), 4000);
          }
        },
        error: (err) => {
          alert('failed');
        },
        complete: () => {},
      });
    }
  }
  
}

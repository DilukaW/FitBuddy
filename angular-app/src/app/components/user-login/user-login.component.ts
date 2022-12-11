import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/auth/user.service';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

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
    private trainerService: TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //hide spinner
    this.hideSpinner();

    //login form
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

  //getting login user type
  changeType(e: any) {
    this.loginForm.get('type')!.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //on login btn clicked
  onSubmit(form: FormGroup) {
    //login for user
    if (form.get('type')?.value == 1) {
      const data = form.value;
      //console.log(data);
      delete data['type'];
      this.userService.loginUser(data).subscribe({
        next: async (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 2000);
            sessionStorage.setItem('user-token', res.token);
            this.showSpinner();
            setTimeout(
              () =>
                this.router.navigate(['user/profile']).then(() => {
                  window.location.reload();
                }),
              1000
            );
            //await this.router.navigate(['user/profile']);
            //window.location.reload();
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 2000);
          }
        },
        error: (err) => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        },
        complete: async () => {
          this.restForm(form);
        },
      });
    }

    //login for trainer
    else if (form.get('type')?.value == 2) {
      //console.log(2);
      const data = form.value;
      delete data['type'];
      this.trainerService.loginTrainer(data).subscribe({
        next: async (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 2000);
            sessionStorage.setItem('trainer-token', res.token);
            this.showSpinner();
            setTimeout(
              () =>
                this.router.navigate(['trainer/profile']).then(() => {
                  window.location.reload();
                }),
              1000
            );
            //await this.router.navigate(['trainer/profile']);
            //window.location.reload();
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 2000);
          }
        },
        error: (err) => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        },
        complete: () => {
          this.restForm(form);
        },
      });
    }

    //login for admin
    else {
      //console.log(3);
      const data = form.value;
      delete data['type'];
      this.adminService.loginAdmin(data).subscribe({
        next: async (res) => {
          if (res.success) {
            this.showSuccessMsg = true;
            setTimeout(() => (this.showSuccessMsg = false), 2000);
            sessionStorage.setItem('admin-token', res.token);
            this.showSpinner();
            setTimeout(
              () =>
                this.router.navigate(['admin/profile']).then(() => {
                  window.location.reload();
                }),
              1000
            );
            //await this.router.navigate(['admin/profile']);
            //window.location.reload();
          } else {
            this.errorMsg = res.message;
            this.showErrorsMsg = true;
            setTimeout(() => (this.showErrorsMsg = false), 2000);
          }
        },
        error: (err) => {
          this.errorMsg = 'Server Error';
          this.showErrorsMsg = true;
          setTimeout(() => (this.showErrorsMsg = false), 2000);
        },
        complete: () => {
          this.restForm(form);
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

  //show loading spinner
  hideSpinner() {
    $('.spinnerLogin').css('visibility', 'hidden');
  }

  //hide loading spinner
  showSpinner() {
    $('.spinnerLogin').css('visibility', 'visible');
  }
}

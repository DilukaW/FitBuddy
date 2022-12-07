import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
  providers: [UserService],
})
export class UserSignupComponent implements OnInit {
  signupForm!: FormGroup;
  showSuccessMsg!: boolean;
  showErrorsMsg!: boolean;
  errorMsg!: String;
  successMsg!: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    //hide spinner
    this.hideSpinner();

    // form validation
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      uname: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      gender: new FormControl(''),
    });
    this.signupForm.get('gender')?.setValue('Male');
  }

  //get gender value
  changeType(e: any) {
    this.signupForm.get('gender')!.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // form submit function
  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.userService.registerUser(form.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.showSuccessMsg = true;
          this.successMsg = 'Registered Successfully';
          setTimeout(() => (this.showSuccessMsg = false), 2000);
          this.showSpinner()
          setTimeout(
            () =>
              this.router.navigate(['login']).then(() => {
                window.location.reload();
              }),
            2000
          );
          
        }
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
        this.restForm(form);
      },
    });

  }

  // reset form field values
  restForm(form: FormGroup) {
    this.userService.selectedRegUser = {
      _id: ' ',
      uname: ' ',
      gender: ' ',
      age: parseInt(''),
      email: ' ',
      password: ' ',
      image: '',
      trainersId:''
    };
    form.reset();
    this.signupForm.get('gender')?.setValue('Male');
  }

  //show loading spinner
  hideSpinner() {
    $('.spinnerSignup').css('visibility', 'hidden');
  }

  //hide loading spinner
  showSpinner() {
    $('.spinnerSignup').css('visibility', 'visible');
  }
}

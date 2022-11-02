import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../user-registration/user';
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
  errorMsg!: String;

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    // form validation
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      uname: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  // form submit function
  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.userService.registerUser(form.value).subscribe({
      next: (res) => {
        this.showSuccessMsg = true;
        setTimeout(() => (this.showSuccessMsg = false), 4000);
        this.router.navigate(['/profile']);
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
    /*
    .subscribe(
      (res) => {
        this.showSuccessMsg = true;
        setTimeout(() => (this.showSuccessMsg = false), 4000);
        this.restForm(form);
        
      },
      (err) => {
        if (err.status == 422) {
          this.errorMsg = err.error.join('<br/>');
          setTimeout(() => (this.errorMsg = ""), 4000);
        } else {
          this.errorMsg = 'Some thing went wrong !';
         
        }
      }
      
    );*/
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
    this.errorMsg = '';
  }
}

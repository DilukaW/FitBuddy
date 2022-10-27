import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../user-registration/user';
import { UserService } from 'src/app/shared/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      uname: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.userService.registerUser(form.value).subscribe(
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
      
    );
    
  }

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

import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm!:FormGroup;
  showSuccessMsg!: boolean;
  errorMsg!: String;

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {

    this.loginForm=new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      type: new FormControl('',)

    })
    this.loginForm.get('type')?.setValue(1);
  }
  changeType(e:any){
    this.loginForm.get('type')!.setValue(e.target.value, {
      onlySelf: true
   })
  }

  onSubmit(){

    const data=this.loginForm.value;
    delete data['type'];
    console.log(this.loginForm.value);
    this.userService.loginUser(data).subscribe({
      next: (res) => {
        if(res.success){
          this.showSuccessMsg=true;
          setTimeout(() => (this.showSuccessMsg = false), 4000);
          localStorage.setItem('token',res.token);
          this.router.navigate(['/profile']);
        }
        else{
          this.errorMsg = res.message;
          setTimeout(() => (this.showSuccessMsg = false), 4000);
        }
       
      },
      error: (err) => {
       alert('failed')
      },
      complete: () => {
       
      },
    });
  }

}

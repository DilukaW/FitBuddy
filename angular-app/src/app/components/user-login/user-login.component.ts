import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor() { }

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
    console.log(this.loginForm.value)
  }

}

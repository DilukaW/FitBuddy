import { Component, OnInit } from '@angular/core';
import { User } from './user';

import { UserService } from './user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers:[UserService]
})
export class UserRegistrationComponent implements OnInit {

  

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.allUsers();
  }
  

  onSubmit(form:NgForm){

    this.userService.addUser(form.value).subscribe((res)=>{

      console.log("added");
    }); 
    console.log(form.value);
  }

  allUsers(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.users=res as User[];
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/auth/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

userSession:any;
adminSession:any;
data:any
path:any

  constructor(private userService: UserService,private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {

    this.userSession=sessionStorage.getItem('user-token')
    this.adminSession=sessionStorage.getItem('admin-token')


    if(this.userSession){
      this.getUserDetails()
      this.path="user/profile"
    }
    if(this.adminSession){
      this.getAdminDetails()
      this.path="admin/profile"
    }

  }
  // get admin details
  getAdminDetails() {
    this.adminService.getAdminProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
          
        }
      },
      error: (err) => {
       
      },
      complete: () => {},
    });
  }

  //get user details
  getUserDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;

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

  //logout function
  async logOut(){
    
    sessionStorage.clear();
    await this.router.navigate(['/']);
    window.location.reload();
  }

}


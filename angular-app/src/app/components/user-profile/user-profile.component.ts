import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/auth/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService,private router:Router) {}

  data: any;
  

  ngOnInit(): void {
    this.getDetails();  
  }

  getDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
        }
        else{
          
        }
      },
      error: (err) => {},
      complete: () => {
        
      },
    });
  }
  logOut(){
    
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/auth/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { TrainerService } from 'src/app/shared/trainer/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userSession: any;
  trainerSession: any;
  adminSession: any;
  data: any;
  path: any;
  collapsed = true;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user-token');
    this.adminSession = sessionStorage.getItem('admin-token');
    this.trainerSession = sessionStorage.getItem('trainer-token');

    if (this.userSession) {
      this.getUserDetails();
      this.path = 'user/profile';
    }
    if (this.adminSession) {
      this.getAdminDetails();
      this.path = 'admin/profile';
    }
    if (this.trainerSession) {
      this.getTrainerDetails();
      this.path = 'trainer/profile';
    }
  }
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  // get admin details
  getAdminDetails() {
    this.adminService.getAdminProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  //get user details
  getUserDetails() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
        } else {
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  //get trainer details
  getTrainerDetails() {
    this.trainerService.getTrainerProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
        } else {
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  
  //logout function
  async logOut() {
    sessionStorage.clear();
    await this.router.navigate(['/']);
    window.location.reload();
  }
}

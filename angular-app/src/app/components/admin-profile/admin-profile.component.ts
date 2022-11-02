import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  data:any
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getDetails();
    
  }
  getDetails() {
    this.adminService.getAdminProfile().subscribe({
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
    
    sessionStorage.clear();
    
  }
}

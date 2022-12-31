import { Injectable } from '@angular/core';
import { Admin } from './admin.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  selectedAdmin: Admin = {
    _id: ' ',
    uname: ' ',
    email: ' ',
    password: ' ',
  };

  constructor(private http: HttpClient) {}

  loginAdmin(data: any): Observable<any> {
    return this.http.post('admins/login', data);
  }

  getAdminProfile(): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + sessionStorage.getItem('admin-token'),
    };
    return this.http.get('admins/profile', { headers: headers });
  }
}

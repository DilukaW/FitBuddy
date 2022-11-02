import { Injectable } from '@angular/core';
import { Admin } from './admin.model';
import{HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{ Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedAdmin:Admin={
    _id:" ",
    uname:" ",
    email:" ",
    password:" ",
  };

  constructor(private http:HttpClient) { }

  loginAdmin(data: any):Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('token')
    }
    return this.http.post(environment.baseUrl+'admin/login',data);
  }

  getAdminProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('token')
    }
    return this.http.get(environment.baseUrl+'admin/profile',{headers:headers});
  }
}

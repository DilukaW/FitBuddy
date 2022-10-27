import { Injectable } from '@angular/core';
import { User } from './user.model';
import{HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{ Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser:User={
    _id:" ",
    uname:" ",
    email:" ",
    password:" ",
  };

  constructor(private http:HttpClient) { }

  registerUser(user:User):Observable<any>{
    return this.http.post(environment.baseUrl+'users/register',user);
  }
  
  loginUser(data: any):Observable<any>{
    let headers={
      'Authorization':"Bearer "+localStorage.getItem('token')
    }
    return this.http.post(environment.baseUrl+'users/login',data);
  }

  getUserProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer "+localStorage.getItem('token')
    }
    return this.http.get(environment.baseUrl+'users/profile',{headers:headers});
  }
}

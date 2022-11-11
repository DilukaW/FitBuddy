import { Injectable } from '@angular/core';
import { User,regUser } from './user.model';
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
  selectedRegUser:regUser={
    _id:" ",
    uname:" ",
    gender:" ",
    age:Number(null),
    email:" ",
    password:" ",
  };
  constructor(private http:HttpClient) { }

  registerUser(user:regUser):Observable<any>{
    return this.http.post('users/register',user);
  }
  
  loginUser(data: any):Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('token')
    }
    return this.http.post('users/login',data);
  }

  getUserProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('token')
    }
    return this.http.get('users/profile',{headers:headers});
  }
  updateUserById(id:string,data: any):Observable<any>{
  
    return this.http.put('users/'+id,data);
  }
}

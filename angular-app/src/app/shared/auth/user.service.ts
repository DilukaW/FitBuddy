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
    image:" ",
    trainersId:" ",
    password:" ",
    
  };
  constructor(private http:HttpClient) { }

  registerUser(user:regUser):Observable<any>{
    return this.http.post('users/register',user);
  }
  
  loginUser(data: any):Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('user-token')
    }
    return this.http.post('users/login',data);
  }

  getUserProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('user-token')
    }
    return this.http.get('users/profile',{headers:headers});
  }
  getAllUsers():Observable<any>{
  
    return this.http.get('users/all');
  }
  getUserById(id:string):Observable<any>{
  
    return this.http.get('users/'+id);
  }
  updateUserById(id:string,image:any,data: any):Observable<any>{
  
    return this.http.put('users/'+id,image,data);
  }
 
  addTrainers(id:string,data: any):Observable<any>{
  
    return this.http.put('users/trainers/'+id,data);
  }
  
}

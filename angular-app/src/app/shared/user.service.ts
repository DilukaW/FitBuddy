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

  registerUser(user:User){
    return this.http.post(environment.baseUrl+'users/register',user)
  }
}

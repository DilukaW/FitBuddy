import { Injectable } from '@angular/core';
import{ Observable,of } from 'rxjs';
import { User } from './user'
import{HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser!: User;
  users!:User[];

  readonly baseUrl='http://localhost:3000/users';

  constructor(private http:HttpClient) { 
  }

  addUser(user:User){

    return this.http.post(this.baseUrl,user);
  }

  getUsers(){
    return this.http.get(this.baseUrl);
  }
}

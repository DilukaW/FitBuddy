import { Injectable } from '@angular/core';
import { Trainer } from './trainer.model';
import{HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{ Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  selectedTrainer:Trainer={
    _id:" ",
    uname:" ",
    email:" ",
    area:" ",
    description:" ",
    password:" ",
  };

  constructor(private http:HttpClient) { }
  registerTrainer(trainer:Trainer):Observable<any>{
    return this.http.post(environment.baseUrl+'trainer/register',trainer);
  }
  
  loginTrainer(data: any):Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('token')
    }
    return this.http.post(environment.baseUrl+'trainer/login',data);
  }

  getTrainerProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('token')
    }
    return this.http.get(environment.baseUrl+'trainer/profile',{headers:headers});
  }
}

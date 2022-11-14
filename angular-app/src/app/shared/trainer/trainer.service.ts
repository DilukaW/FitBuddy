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
    image:" ",
  };


  constructor(private http:HttpClient) { }
  registerTrainer(trainer:Trainer,):Observable<any>{
    return this.http.post('trainers/register',trainer);
  }
  
  loginTrainer(data: any):Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('trainer-token')
    }
    return this.http.post('trainers/login',data);
  }

  getTrainerProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer "+sessionStorage.getItem('trainer-token')
    }
    return this.http.get('trainers/profile',{headers:headers});
  }

  getAllTrainers():Observable<any>{
   
    return this.http.get('trainers/all',);

  }
  getTrainerById(id:string):Observable<any>{
  
    return this.http.get('trainers/'+id);
  }
  updateTrainerById(id:string,image:any,data: any):Observable<any>{
  
    return this.http.put('trainers/'+id,image,data);
  }
  deleteTrainerById(id:string):Observable<any>{
  
    return this.http.delete('trainers/'+id);
  }

}

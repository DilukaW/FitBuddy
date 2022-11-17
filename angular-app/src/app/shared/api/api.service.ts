import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getBodyParts():Observable<any>{
  
    return this.http.get('bodyPartList');
  }

  getAllExercises():Observable<any>{
  
    return this.http.get('exercises');
  }
 getExercisesByBodyPart(part:string):Observable<any>{
  
   return this.http.get('part/'+part);
 }
 getExerciseById(id:any):Observable<any>{
  
  return this.http.get('exerciseId/'+id);
}

 
 
}

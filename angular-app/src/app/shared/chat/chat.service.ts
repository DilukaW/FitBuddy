import { Injectable } from '@angular/core';
import{HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client'; 
import { Chat } from './chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

 
 
  constructor(private http:HttpClient) { }

  // sendMessage(message: any) {
  //   // console.log('sendMessage: ', message)
  //   // this.socket.emit('message', message);
  //   this.socket.on('chatAdd')
  // }

  // getNewMessage (){
  //   let observable=new Observable<{message:String}>(Observer=>{
  //     this.socket.on('message', (message) =>{
  //       Observer.next(message)

  //     });
  //     return()=>{this.socket.disconnect();}
  //   })

  
  //   return observable;
  // }
 
  //add user chats
  addUserChat(data:any):Observable<any>{
    return this.http.post('chats/addUser',data);
  }

  //get user chat form user chat 
  getUserChat(sid:string,rid:string):Observable<any>{
  
    return this.http.get('chats/getUserChat/'+sid+'/'+rid);
  }
  //get trainer chat form user chat 
  getTrainerChat(sid:string,rid:string):Observable<any>{
  
    return this.http.get('chats/getTrainerChat/'+sid+'/'+rid);
  }

  //add trainer chats
  addTrainerChat(data:any):Observable<any>{
    return this.http.post('chats/addTrainer',data);
  }

  //get trainer chat form trainer chat 
  getTChat(sid:string,rid:string):Observable<any>{
  
    return this.http.get('chats/getTChat/'+sid+'/'+rid);
  }

  //get user chat form trainer chat 
  getUChat(sid:string,rid:string):Observable<any>{
  
    return this.http.get('chats/getUChat/'+sid+'/'+rid);
  }
}

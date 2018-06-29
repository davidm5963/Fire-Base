import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../Models/chat-message.model'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) 
  {
    this.afAuth.authState.subscribe(auth =>{
        if(auth != undefined && auth != null){
          this.user = auth;
        }
      }
    )
  }

  sendMessage(msg: string){
    const timeStamp = this.getTimeStamp();
    //const email = this.user.email;
    const email = "test@examplle.com";    
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      timeSent: timeStamp,
      message: msg,
      //userName: this.user.userName,
      userName: "David",      
      email: email,
    });

    console.log("Called sendMessage()");
  }

  getMessages(){
    return this.db.list('messages');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}

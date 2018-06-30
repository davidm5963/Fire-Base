import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  chatMessagesCollection: AngularFirestoreCollection<ChatMessage>;
  chatMessages: Observable<ChatMessage[]>;
  userName: Observable<string>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) 
  {
    
  }

  getUser(){
    const userId = this.user.userId;
    const path = `users/${userId}`;
    return this.afs.doc(path).valueChanges();
  }

  sendMessage(msg: string){
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.getMessages().add({
      timeSent: timeStamp,
      message: msg,
      userName: this.user.userName,
      email: email,
    });

    console.log("Called sendMessage()");
  }

  getMessages(){
    this.chatMessagesCollection = this.afs.collection('chatMessage');
    return this.chatMessagesCollection;
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

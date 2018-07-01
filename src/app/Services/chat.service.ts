import { Injectable, OnInit } from '@angular/core';
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
export class ChatService{

  user: any;
  chatMessagesCollection: AngularFirestoreCollection<ChatMessage>;
  chatMessages: Observable<ChatMessage[]>;
  userName: Observable<string>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {  }

  sendMessage(msg: string){
    this.afs.doc(`users/${firebase.auth().currentUser.uid}`).ref.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());

        this.user = doc.data();
        const timeStamp = this.getTimeStamp();
        this.getMessages().add({
          timeSent: timeStamp,
          message: msg,
          displayName: this.user.displayName,
          email: this.user.email,
        });
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
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

import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../Models/chat-message.model'
import { User } from '../Models/user.model';
import { DirectMessage } from '../Models/direct-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService{

  user: any;
  chatMessagesCollection: AngularFirestoreCollection<ChatMessage>;
  directMessagesCollection: Observable<any>;
  recievedDirectMessagesCollection: AngularFirestoreCollection<DirectMessage>;
  sentDirectMessagesCollection: AngularFirestoreCollection<DirectMessage>;

  usersCollection: AngularFirestoreCollection<User>;
  
  userName: Observable<string>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {  }

  sendMessage(msg: string){
        this.getMessages().add({
          timeSent: new Date().toUTCString(),
          message: msg,
          uid: firebase.auth().currentUser.uid
        });
  }

  sendDirectMessage(msg: string, recieverUid: string){
      this.getSentDirectMessages(recieverUid).add({
        chatMessage: {
          timeSent: new Date().toUTCString(),
          message: msg,
          uid: firebase.auth().currentUser.uid
        },
        recieverUid: recieverUid
      });
  }
  

  getMessages(){
    this.chatMessagesCollection = this.afs.collection('chatMessage', ref => ref.orderBy('timeSent'));
    return this.chatMessagesCollection;
  }

  getSentDirectMessages(uid: string){
    return this.sentDirectMessagesCollection = this.afs.collection('directMessage', 
      ref => ref.where('recieverUid', '==', uid).where('chatMessage.uid', '==', firebase.auth().currentUser.uid).orderBy('chatMessage.timeSent'));
  }

  getRecievedDirectMessagees(uid: string){
    return this.recievedDirectMessagesCollection = this.afs.collection('directMessage', 
      ref => ref.where('recieverUid', '==', firebase.auth().currentUser.uid).where('chatMessage.uid', '==', uid).orderBy('chatMessage.timeSent'));     
  }

  getDirectMessages(uid: string){     
    //use combineLatest to merge sent direct messages and recieved direct mesages into single observable                               
     return this.directMessagesCollection = combineLatest<any[]>(this.getRecievedDirectMessagees(uid).valueChanges(),this.getSentDirectMessages(uid).valueChanges()).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur) ) ),
      );
  }

  getUsers()
  {
    this.usersCollection =  this.afs.collection('users', ref => ref.orderBy('status', 'desc'));
    return this.usersCollection;
  }

}

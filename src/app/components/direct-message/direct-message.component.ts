import { Component, OnInit, Input } from '@angular/core';
import { DirectMessage } from '../../Models/direct-message.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit {

  @Input() chatMessage: DirectMessage;
  message: string;
  timeSent: string;
  isOwnMessage: boolean;
  profileImageUrl: any;
  currentUser: any;
  messageSender: any;

  constructor() {
   }

  ngOnInit(chatMessage = this.chatMessage) {
    this.message = chatMessage.chatMessage.message;
    this.timeSent = chatMessage.chatMessage.timeSent;
    this.isOwnMessage = this.chatMessage.chatMessage.uid === firebase.auth().currentUser.uid;
    
  }


}

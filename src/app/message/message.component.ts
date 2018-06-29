import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { AuthService } from '../Services/auth.service';
import { ChatMessage } from '../Models/chat-message.model'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  email: string;
  userName: string;
  message: string;
  timeSent: string;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.message = chatMessage.message;
    this.email = chatMessage.email;
    this.userName = chatMessage.userName;
    this.timeSent = chatMessage.timeSent;
    
  }

}

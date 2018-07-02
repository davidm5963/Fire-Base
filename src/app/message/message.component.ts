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
  displayName: string;
  message: string;
  timeSent: string;
  isOwnMessage: boolean;

  constructor(private authService: AuthService) {
      console.log(authService.getCurrentUser())
      authService.getCurrentUser().subscribe(user =>{
        this.isOwnMessage = this.email === user.email;
      })
    
   }

  ngOnInit(chatMessage = this.chatMessage) {
    this.message = chatMessage.message;
    this.email = chatMessage.email;
    this.displayName = chatMessage.displayName;
    this.timeSent = chatMessage.timeSent;
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { AuthService } from '../Services/auth.service';
import { ChatMessage } from '../Models/chat-message.model'
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  message: string;
  timeSent: string;
  isOwnMessage: boolean;
  profileImageUrl: any;
  profileImagePath: string;

  constructor(private authService: AuthService, private storage: AngularFireStorage) {
      console.log(authService.getCurrentUser())
      authService.getCurrentUser().subscribe(user =>{
        this.isOwnMessage = this.chatMessage.user.email === user.email;
      });
    
   }

  ngOnInit(chatMessage = this.chatMessage) {
    this.message = chatMessage.message;
    this.timeSent = chatMessage.timeSent;

    this.storage.ref(chatMessage.user.profileImageUrl).getDownloadURL().subscribe(url => {
    this.profileImageUrl = url;
  });
  }


}

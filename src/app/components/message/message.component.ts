import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { AuthService } from '../../Services/auth.service';
import { ChatMessage } from '../../Models/chat-message.model'
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';
import { User } from '../../Models/user.model';

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
  currentUser: any;
  messageSender: any;
  showLoadingSpinner=true;

  constructor(private authService: AuthService, private storage: AngularFireStorage) {
      authService.getCurrentUser().subscribe(user =>{
        this.currentUser = user;
        this.isOwnMessage = this.chatMessage.uid === user.uid;
      });
    
   }

  ngOnInit(chatMessage = this.chatMessage) {
    this.message = chatMessage.message;
    this.timeSent = chatMessage.timeSent;
    this.authService.getUserDocById(chatMessage.uid).get().then(doc =>
      {
        this.messageSender = doc.data();
        this.storage.ref(this.messageSender.profileImageUrl).getDownloadURL().subscribe(url => {
          this.showLoadingSpinner = false;
          this.profileImageUrl = url;
          });
      });
  }
}

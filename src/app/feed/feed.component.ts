import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage } from '../Models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.feed = this.chatService.getMessages().valueChanges()
  }

  ngOnChanges(){
    this.ngOnInit();  
  }

}

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

  feed: any[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages().snapshotChanges()
    .subscribe(item => {
      this.feed = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x['$key'] = element.key;
        this.feed.push(x);
        })
      });
  }

  ngOnChanges(){
    this.ngOnInit();  
  }

}

import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage } from '../../Models/chat-message.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: Observable<any>;
  recieverUid: string;
  showLoadingSpinner = true;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.recieverUid = this.route.snapshot.params['uid'];    
  }

  ngOnInit() {
    if(this.recieverUid == null || this.recieverUid == undefined){
      this.feed = this.chatService.getMessages().valueChanges();
      this.chatService.getMessages().valueChanges().subscribe(() => this.showLoadingSpinner = false)
      console.log(this.feed);
    }
    else{
      this.feed = this.chatService.getDirectMessages(this.recieverUid);
      this.chatService.getMessages().valueChanges().subscribe(() => this.showLoadingSpinner = false)      
      console.log(this.feed);
    }
  }

  ngOnChanges(){
    this.ngOnInit();  
  }

}

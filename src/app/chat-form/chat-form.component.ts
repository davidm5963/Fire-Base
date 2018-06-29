import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service'

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  send(){
    this.chatService.sendMessage(this.message);
  }

  handleSubmit(event)
  {
    if(event.keycode == 13)
    {
      this.send();
    }
  }

}

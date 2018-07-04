import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {


  constructor(private fb: FormBuilder, private chatService: ChatService) { }

  ngOnInit() {
    
  }

  send(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  handleSubmit(event)
  {
    if(event.keycode == 13)
    {
      this.send();
    }
  }

}

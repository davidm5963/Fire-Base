import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  chatForm: FormGroup;

  constructor(private fb: FormBuilder, private chatService: ChatService) { }

  ngOnInit() {
    this.chatForm = this.fb.group({
      'message' : ['', [Validators.required]]
    });
  }

  send(){
    this.chatService.sendMessage(this.message.value);
  }

  handleSubmit(event)
  {
    if(event.keycode == 13)
    {
      console.log('keycode 13 pressed')
      this.send();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  chatForm: FormGroup;
  recieverUid: string;

  constructor(private fb: FormBuilder, 
              private chatService: ChatService, 
              private route: ActivatedRoute) {
                
    this.recieverUid = this.route.snapshot.params['uid'];    
   }

  ngOnInit() {
    this.chatForm = this.fb.group({
      'message' : ['', [Validators.required]]
    });
  }

  send(){
    if(this.recieverUid == null || this.recieverUid == undefined){
      this.chatService.sendMessage(this.message.value);      
    }
    else{
      this.chatService.sendDirectMessage(this.message.value, this.recieverUid)
    }
    this.chatForm.reset();
  }

  get message(){
    return this.chatForm.get('message');
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

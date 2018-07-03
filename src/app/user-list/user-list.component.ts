import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/user.model';

import { Observable } from 'rxjs';
import { ChatService } from '../Services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  users: Observable<User[]>;

  constructor(private chatService: ChatService) { 
  }

  ngOnInit() {
    this.users = this.chatService.getUsers().valueChanges();    
  }

  ngOnChanges(){
    this.ngOnInit();
  }

}

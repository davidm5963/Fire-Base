import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  displayName: string;
  email: string;
  status: string;

  constructor() { }

  ngOnInit(user = this.user) {
    this.displayName = user.displayName;
    this.email = user.email;
    this.status = user.status;
  }

}

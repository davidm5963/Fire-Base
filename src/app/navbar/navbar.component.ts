import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) {
    authService.getCurrentUser().subscribe(user =>{
      this.user = user;
      console.log(this.user);
    })
  }
  ngOnInit() {
  }

  logout() {
    this.authService.updateData({status: 'offline'})
    this.authService.signOut();
  }

}

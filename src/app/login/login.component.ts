import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  login()
  {
    this.authService.login(this.email, this.password);
  }

}

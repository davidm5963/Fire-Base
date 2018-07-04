import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService, public fb: FormBuilder) { }

  ngOnInit(){

    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.required
        ]
      ]
    });
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  login()
  {
    this.authService.login(this.email.value, this.password.value).catch(error => {
      this.errorMessage = error;
    }
    );
  }

}

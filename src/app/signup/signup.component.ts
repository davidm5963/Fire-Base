import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../Services/auth.service';
import { ChatroomComponent } from '../chatroom/chatroom.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{

  signupForm: FormGroup;
  user: any;

  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {

    // First Step
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'region': ['', [
        ]
      ],
      'displayName': ['', [ Validators.required ] ]
    });
    
  }

  // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get displayName() { return this.signupForm.get('displayName') }


  // Step 1
  signup() {
    return this.auth.signUp(this.email.value, this.password.value, this.displayName.value);
  }
}

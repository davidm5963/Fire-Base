import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './components/app/app.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';

import { appRoutes } from './Routes'

import { AuthService } from './Services/auth.service'
import { ChatService } from './Services/chat.service'
import { environment } from '../environments/environment';
import { AuthGuard } from './Services/auth.guard';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './components/user/user.component';
import { DirectMessageComponent } from './components/direct-message/direct-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    ChatroomComponent,
    UserProfileComponent,
    UserComponent,
    DirectMessageComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthService,
    ChatService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

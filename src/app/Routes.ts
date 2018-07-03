import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthGuard } from './Services/auth.guard';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', canActivate: [AuthGuard], component: ChatroomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
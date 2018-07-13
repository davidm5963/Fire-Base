import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthGuard } from './Services/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatroomComponent, canActivate: [AuthGuard] },
    { path: 'user/:uid', component: UserComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/chat', pathMatch: 'full'},
];
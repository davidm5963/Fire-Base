import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { AuthGuard } from './Services/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './components/user/user.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatroomComponent, canActivate: [AuthGuard] },
    { path: 'user/:uid', component: UserComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/chat', pathMatch: 'full'},
];
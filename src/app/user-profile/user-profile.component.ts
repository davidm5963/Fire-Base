import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  uid: string;
  isOwnProfile: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    //get user id from route
    this.uid = this.route.snapshot.params['uid'];
    
    //get user document reference from firestore using auth service
    this.authService.getUserDocById(this.uid).get().then(doc =>{
        this.user = doc.data();
        console.log(this.user);
      }
    );
    
    if(this.uid == this.authService.user.uid){
      this.isOwnProfile = true;
    }
    else{
      this.isOwnProfile = false;
     }
    }

}

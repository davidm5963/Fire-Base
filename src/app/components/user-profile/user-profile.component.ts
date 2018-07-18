import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  uid: string;
  isOwnProfile: boolean;

  task: AngularFireUploadTask;
  imageUrl: any;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private storage: AngularFireStorage,
              private afs: AngularFirestore) {

                //get user id from route             
                this.uid = this.route.snapshot.params['uid'];
                
                //check if current user is viewing own profile
                authService.getCurrentUser().subscribe(user =>{
                  this.isOwnProfile = this.uid === user.uid;
                });

                 console.log(this.isOwnProfile);
                 console.log(this.uid)
               }

  ngOnInit() {
    
    //get user document reference from firestore using auth service
    this.authService.getUserDocById(this.uid).get().then(doc =>{
        this.user = doc.data();
        console.log(this.user);
        
        this.storage.ref(this.user.profileImageUrl).getDownloadURL().subscribe(url => {
            this.imageUrl = url;
        });
      }
    );
  }

  //profile image handling

  startUpload(event: FileList) {

    console.log("startUpload() Called")
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      return;
    }

    // The storage path
    const path = `profileImages/${new Date().getTime()}_${file.name}`;

    // The main upload task
    this.task = this.storage.upload(path, file)

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update users profileImageUrl on completion
          this.afs.doc(this.authService.getUserDocById(this.uid)).update({ profileImageUrl:  path });
        }
      })
    )

  }
}


    
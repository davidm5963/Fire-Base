import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { User } from '../Models/user.model'


@Injectable()
export class AuthService {

  user: any;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      // Define the user observable
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            // logged in, get custom user from Firestore
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            // logged out, null
            return of(null);

          }
        })
      )
      console.log(this.user);
  }

  getCurrentUser()
  {
    return this.user;
  }

  //// Email/Password Auth ////
  
  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
         // create initial user document
        this.setUserDoc();
        this.updateUser(displayName);
        this.router.navigate(['chat']);
      })
      .catch(error => console.log(error) );
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(firebase.auth().currentUser);
        this.router.navigate(['chat']);
      });
  }

  // Update properties on the user document
  updateUser(data: any) { 
    return this.afs.doc(`users/${this.user.uid}`).update({displayName: data})
  }

  // Sets user data to firestore after succesful login
  private setUserDoc() {

    var user = firebase.auth().currentUser;    
    console.log(user)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      status: 'Online',
      displayName: ''
    }

    return userRef.set(data)

  }

  signOut(){
    firebase.auth().signOut().then(function() {
      this.router.navigate(['login']);
      this.afs.doc(`users/${this.user.uid}`).update({status: 'Offline'})
    }).catch(function(error) {
      // An error happened.
    });
  }
}
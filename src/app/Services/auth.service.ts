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
  userId: any;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      // Define the user observable
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            // logged in, get custom user from Firestore
            this.userId = user.uid;
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            // logged out, null
            return of(null);

          }
        })
      )
      console.log(this.user);
  }

  getCurrentUser(): Observable<User>
  {
    return this.user;
  }
  getFirebaseUser(){
    return firebase.auth().currentUser;
  }
  //// Email/Password Auth ////
  
  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
         // create initial user document
        this.setUserDoc();
        this.updateData({displayName: displayName});
        this.router.navigate(['chat']);
      })
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateData({status: 'online'});                
        this.router.navigate(['chat']);
      });
  }

  // Update properties on the user document
  updateData(data: any) { 
    console.log("updating statsu")
    var user = firebase.auth().currentUser;
    console.log(user);
    return this.afs.doc(`users/${user.uid}/`).update(data)
  }

  // Sets user data to firestore after succesful login
  private setUserDoc() {

    var user = firebase.auth().currentUser;    
    console.log(user)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      status: 'online',
      displayName: '',
      profileImageUrl: ''
    }

    return userRef.set(data)

  }

  signOut(){
    console.log('updating status on logout')
    
    
    firebase.auth().signOut().then(result =>{
      this.router.navigate(['login']);
    }).catch(function(error) {
      console.log(error);
    });
  }
}
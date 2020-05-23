import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  test?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.getRedirectResult().then((credential) => {
      if (credential.user) {
        this.afs.doc<User>(`users/${credential.user.uid}`).set(
          {
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: credential.user.displayName,
            photoURL: credential.user.photoURL,
          },
          { merge: true }
        );
        this.router.navigate(['account', 'user', 'test']);
      }
    });
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log(user.toJSON());
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async SocialSignIn(choice: string) {
    let provider: any;
    switch (choice) {
      case 'facebook':
        provider = new auth.FacebookAuthProvider();
        break;
      case 'google':
        provider = new auth.GoogleAuthProvider();
        break;
      case 'twitter':
        provider = new auth.TwitterAuthProvider();
        break;
    }
    try {
      this.afAuth.signInWithRedirect(provider);
    } catch (error) {
      console.error(`Error while ${choice} Sign In with Redirect`, error);
    }
  }

  async emailSignIn(email: string, password: string): Promise<boolean> {
    let cred: auth.UserCredential = null;
    try {
      cred = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['account', 'user', 'test']);
    } catch (error) {
      console.error('Error while Sign In with Email & Password', error);
      return false;
    }
    return true;
  }

  async emailSignUp(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    let credential: auth.UserCredential = null;
    try {
      credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.afs.doc<User>(`users/${credential.user.uid}`).set(
        {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: username,
        },
        { merge: true }
      );
      this.router.navigate(['account', 'user', 'test']);
    } catch (error) {
      console.error('Error in Creating User with email & password', error);
      return false;
    }
    return true;
  }
}

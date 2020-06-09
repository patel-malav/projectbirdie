import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

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
  authenticated$: Observable<boolean>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.getRedirectResult();
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.authenticated$ = this.user$.pipe(map((user) => !!user));
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['explore']);
    } catch (error) {
      console.error(`Error While Sign Out`, error);
    }
  }

  private async getRedirectResult() {
    let cred: auth.UserCredential;
    try {
      cred = await this.afAuth.getRedirectResult();
    } catch (error) {
      console.error(`Error in getting Redirect Result`, error);
    }

    try {
      if (cred.user) {
        this.afs.doc<User>(`users/${cred.user.uid}`).set(
          {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.displayName,
            photoURL: cred.user.photoURL,
          },
          { merge: true }
        );
        this.router.navigate(['account', 'user']);
      }
    } catch (error) {
      console.error(`Error in updating user data`, error);
    }
  }

  async emailSignIn(email: string, password: string) {
    let cred: auth.UserCredential = null;
    try {
      cred = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['account']);
    } catch (error) {
      console.error('Error while Sign In with Email & Password', error);
    }
  }

  async emailSignUp(username: string, email: string, password: string) {
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
      this.router.navigate(['account']);
    } catch (error) {
      console.error('Error in Creating User with email & password', error);
    }
  }

  async socialSignIn(platform: string) {
    let provider: any;
    switch (platform) {
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
      console.error(`Error while ${platform} Sign In with Redirect`, error);
    }
  }
}

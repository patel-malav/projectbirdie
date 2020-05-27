import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async socialSignIn(platform: string) {
    console.log(platform);
  }

  async emailSignIn(email: string, password: string) {
    console.log(email, password);
  }

  async emailSignUp(username: string, email: string, password: string) {
    console.log(email, password);
  }
}

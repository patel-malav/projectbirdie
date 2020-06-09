import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'pb-auth',
  template: `
  <pb-gallery id="gallery"></pb-gallery>
    <div id="nav">
      <a mat-raised-button routerLink="./login" routerLinkActive="active"
        >Login</a
      >
      <a mat-raised-button routerLink="./register" routerLinkActive="active"
        >Register</a
      >
      <a mat-raised-button routerLink="./forgot" routerLinkActive="active"
        >Forgot</a
      >
    </div>
    <router-outlet></router-outlet>
    <div id="oauth">
      <button mat-icon-button (click)="auth.socialSignIn('google')">
        <mat-icon svgIcon="google" inline="true"></mat-icon>
      </button>
      <button mat-icon-button (click)="auth.socialSignIn('facebook')">
        <mat-icon svgIcon="facebook" inline="true"></mat-icon>
      </button>
      <button mat-icon-button (click)="auth.socialSignIn('twitter')">
        <mat-icon svgIcon="twitter" inline="true"></mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}

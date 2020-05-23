import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'pb-login',
  template: `
    <h1>🧙 Open Sesame 🧙</h1>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="text" matInput formControlName="email" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input type="password" matInput formControlName="password" />
      </mat-form-field>
      <div id="form-utility-panel">
        <mat-checkbox formControlName="remember">
          Remember Me
        </mat-checkbox>
        <a href="/account/forgot">Forgot Password</a>
      </div>
      <button
        type="submit"
        id="submit-button"
        mat-raised-button
        color="warn"
        [disabled]="!loginForm.valid"
      >
        🏁 Let me Pass 🏁
      </button>
    </form>
    <div id="oauth-panel">
      <button mat-icon-button (click)="auth.SocialSignIn('google')">
        <mat-icon svgIcon="google" inline="true"></mat-icon>
      </button>
      <button mat-icon-button (click)="auth.SocialSignIn('facebook')">
        <mat-icon svgIcon="facebook" inline="true"></mat-icon>
      </button>
      <button mat-icon-button (click)="auth.SocialSignIn('twitter')">
        <mat-icon svgIcon="twitter" inline="true"></mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      // console.warn(this.loginForm.value);
      this.auth.emailSignIn(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    }
  }
}

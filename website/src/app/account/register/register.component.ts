import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'pb-register',
  template: `
    <h1>👨‍💻 Sign Up!! 👩‍💻</h1>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input type="text" matInput formControlName="username" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="email" matInput formControlName="email" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input type="password" matInput formControlName="password" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Confirm Password</mat-label>
        <input type="password" matInput formControlName="cpassword" />
      </mat-form-field>
      <div id="form-utility-panel">
        <p>
          <mat-checkbox formControlName="license"> 👌 I,</mat-checkbox> Allow
          the data submitted to be licenced under
          <a href="https://creativecommons.org/licenses/by-nc/4.0"
            >Creative Common - Non Commerical License</a
          >
          therefore be used in scientific, education purposes.
        </p>
        <p>
          <mat-checkbox formControlName="consent"> 👌 I,</mat-checkbox> Consent
          to allow projbirdie to store and process limited personal information
          in order to manage my account.
        </p>
      </div>
      <button
        type="submit"
        id="submit-button"
        mat-raised-button
        color="primary"
        [disabled]="!registerForm.valid"
      >
        🕊 Submit 🕊
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
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.registerForm = fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      cpassword: [null, [Validators.required, Validators.minLength(8)]],
      license: [false, Validators.requiredTrue],
      consent: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.auth.emailSignUp(
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password
      );
    }
  }
}

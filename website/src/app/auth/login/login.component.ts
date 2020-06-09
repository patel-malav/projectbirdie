import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pb-login',
  template: `
    <h1>Welcome Back!</h1>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="text" matInput formControlName="email" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input type="password" matInput formControlName="password" />
      </mat-form-field>
      <mat-checkbox formControlName="remember" color="primary">
        Remember Me
      </mat-checkbox>
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
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.emailSignIn(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    }
  }
}

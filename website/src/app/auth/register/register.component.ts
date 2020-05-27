import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pb-register',
  template: `
    <h1>Take A Dive</h1>
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
      <small>
        <mat-checkbox formControlName="license" color="primary"> 👌 I,</mat-checkbox> Allow the
        data submitted to be licenced under Creative Common - Non Commerical
        License
        <a href="https://creativecommons.org/licenses/by-nc/4.0"
          >[ Read More ]</a
        >
        therefore be used in scientific, education purposes.
      </small>
      <small>
        <mat-checkbox formControlName="consent" color="primary"> 👌 I,</mat-checkbox> Consent to
        allow projbirdie to store and process limited personal information in
        order to manage my account.
      </small>
      <button
        type="submit"
        id="submit-button"
        mat-raised-button
        color="primary"
        [disabled]="!registerForm.valid"
      >
      🐦 Into Birds 🐦
      </button>
    </form>
  `,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(fb: FormBuilder, public auth: AuthService) {
    this.registerForm = fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
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

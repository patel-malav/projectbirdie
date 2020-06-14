import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pb-verify',
  template: `
    <h1>Email Sent to <span>patelmalav64@gmail.com</span></h1>
    <form [formGroup]="verifyForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Code</mat-label>
        <input type="text" matInput formControlName="email" />
      </mat-form-field>
      <button
        type="submit"
        id="submit-button"
        mat-raised-button
        color="primary"
        [disabled]="!verifyForm.valid"
      >
        Verify My Code
      </button>
    </form>
  `,
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.verifyForm = fb.group({
      email: [
        null,
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.verifyForm.valid) {
      console.log(this.verifyForm.value.email);
    }
  }
}

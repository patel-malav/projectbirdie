import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pb-forgot',
  template: `
    <h1>Chillax We Got It Covered</h1>
    <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="email" matInput formControlName="email" />
      </mat-form-field>
      <button
        type="submit"
        id="submit-button"
        mat-raised-button
        color="primary"
        [disabled]="!forgotForm.valid"
      >
        Let Me Reset
      </button>
    </form>
  `,
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.forgotForm = fb.group({
      email: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value.email);
    }
  }
}

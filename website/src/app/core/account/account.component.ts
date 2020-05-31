import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'pb-account',
  template: `
    <ng-container *ngIf="auth.user$ | async as user">
      <pb-profile [name]="user.displayName" [url]="user?.photoURL"></pb-profile>
    </ng-container>
    <h1>Work In Progress</h1>
  `,
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(public auth: AuthService) {
    // auth.user$.subscribe((user) => console.log(user));
  }

  ngOnInit(): void {}
}

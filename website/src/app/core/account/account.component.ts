import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'pb-account',
  template: `
    <ng-container *ngIf="auth.user$ | async as user; else spinner">
      <pb-profile [name]="user.displayName" [url]="user?.photoURL"></pb-profile>
      <pb-watchlist></pb-watchlist>
      <pb-gallery></pb-gallery>
    </ng-container>
    <ng-template #spinner>
      <h1>Loading ...</h1>
    </ng-template>
  `,
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(public auth: AuthService) {
    // auth.user$.subscribe((user) => console.log(user));
  }

  ngOnInit(): void {}
}

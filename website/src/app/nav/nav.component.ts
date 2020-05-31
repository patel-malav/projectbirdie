import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pb-nav',
  template: `
    <button mat-icon-button (click)="toggle()">
      <mat-icon *ngIf="!open">menu</mat-icon>
      <mat-icon *ngIf="open">close</mat-icon>
    </button>
    <div id="panel" [ngClass]="{ open: open }">
      <div id="body">
        <a routerLink="/account" routerLinkActive="active" mat-stroked-button>
          Account
        </a>
        <a
          routerLink="/contribute"
          routerLinkActive="active"
          mat-stroked-button
        >
          Contribute
        </a>
        <a routerLink="/explore" routerLinkActive="active" mat-stroked-button>
          Explore
        </a>
        <a
          class="auth"
          *ngIf="(auth.authenticated$ | async) === false"
          routerLink="/auth/login"
          mat-stroked-button
        >
          Sign In
        </a>
        <a
          class="auth"
          *ngIf="auth.authenticated$ | async"
          mat-stroked-button
          (click)="auth.signOut()"
        >
          Sign Out
        </a>
        <section>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() open = false;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  toggle(): void {
    this.open = !this.open;
  }
}

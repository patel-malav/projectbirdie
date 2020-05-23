import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-nav',
  template: `
    <div class="container" [ngClass]="{ open: open }">
      <a routerLink="/account" routerLinkActive="active" mat-stroked-button
        >Account</a
      >
      <a routerLink="/contribute" routerLinkActive="active" mat-stroked-button
        >Contribute</a
      >
      <a routerLink="/explore" routerLinkActive="active" mat-stroked-button
        >Explore</a
      >
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    </div>
  `,
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() open: boolean;
  constructor() {}

  ngOnInit(): void {}
}

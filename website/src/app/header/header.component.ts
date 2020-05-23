import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-header',
  template: `
    <h2>ProjBirdie</h2>
    <pb-nav [open]="navOpen"></pb-nav>
    <button mat-icon-button (click)="toggleNav()">
      <mat-icon *ngIf="!navOpen">menu</mat-icon>
      <mat-icon *ngIf="navOpen">close</mat-icon>
    </button>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navOpen = false;
  constructor() {}

  ngOnInit(): void {}

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-profile',
  template: `
    <div
      id="img"
      [style]="{
        'background-image':
          'url(' + (url ? url : 'assets/placeholder.png') + ')'
      }"
    >
      <button mat-mini-fab color="warn">
        <mat-icon>edit</mat-icon>
      </button>
    </div>
    <h2 id="name">{{ name | titlecase }}</h2>
    <p id="descp">Description</p>
  `,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() url = 'assets/placeholder.png';
  @Input() name = 'Loading';
  constructor() {}

  ngOnInit(): void {}
}

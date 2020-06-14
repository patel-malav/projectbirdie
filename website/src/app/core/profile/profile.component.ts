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
    <p id="descp">
      I love watching birds outside my window so i decided to make this website
    </p>
    <h2>6<br />Observations</h2>
    <h2>4<br />Species</h2>
    <h2>India<br />Country</h2>
    <h2>just_me_malav<br />Instagram</h2>
  `,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() url = 'assets/placeholder.png';
  @Input() name = 'Loading';
  constructor() {}

  ngOnInit(): void {}
}

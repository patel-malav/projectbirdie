import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-header',
  template: `
    <h2>ProjBirdie</h2>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}

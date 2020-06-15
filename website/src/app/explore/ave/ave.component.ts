import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-ave',
  template: `
    <div id="head" [ngStyle]="{ 'background-image': 'url(' + data.img + ')' }">
      <h1>{{ data.name }}</h1>
      <h2>{{ data.sci }}</h2>
    </div>
    <article></article>
  `,
  styleUrls: ['./ave.component.scss'],
})
export class AveComponent implements OnInit {
  data = {
    name: 'Parrot',
    sci: 'Order Psittaciformes',
    img: 'https://static.inaturalist.org/photos/6296/medium.jpg?1545396532',
    count: 65000,
    type: 'Regional',
  };
  constructor() {}

  ngOnInit(): void {}
}

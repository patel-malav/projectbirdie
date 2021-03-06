import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-search-result',
  template: `
    <h3>{{ type }}</h3>
    <div>
      <ng-content select="h2"></ng-content>
      <img src="{{ img }}" />
    </div>
  `,
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input()
  type: string;
  @Input()
  img = 'assets/placeholder.png';
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pb-search',
  template: `
    <mat-form-field appearance="outline">
      <mat-icon matPrefix>search</mat-icon>
      <mat-label>Search</mat-label>
      <input matInput type="text" />
    </mat-form-field>
    <div id="search-result">
      <pb-search-result type="user">
        <h2>Malav</h2>
      </pb-search-result>
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  results: Observable<string>;
  constructor() {}
  ngOnInit(): void {}
}

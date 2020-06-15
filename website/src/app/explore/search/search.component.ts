import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Result {
  type: string;
  name: string;
  img: string;
}

@Component({
  selector: 'pb-search',
  template: `
    <mat-form-field appearance="outline">
      <mat-icon matPrefix>search</mat-icon>
      <mat-label>Search</mat-label>
      <input matInput type="text" />
    </mat-form-field>
    <div *ngIf="(results | async).length !== 0" id="search-result">
      <ng-container *ngFor="let result of results | async">
        <pb-search-result [type]="result.type" [img]="result.img">
          <h2>{{ result.name }}</h2>
        </pb-search-result>
      </ng-container>
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  results: Observable<Result[]>;
  constructor() {
    this.results = of([
      // {
      //   type: 'aves',
      //   img: 'https://static.inaturalist.org/photos/6296/square.jpg?1545396532',
      //   name: 'Parrots (Order Psittaciformes)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/39529257/square.jpg?1558464188',
      //   name: 'New World and African Parrots (Family Psittacidae)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/6116601/square.jpg?1545882684',
      //   name: 'Old World Parrots (Family Psittaculidae)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/1816833/square.jpg?1545560095',
      //   name: 'Sylviid Warblers (Family Sylviidae)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/10997575/square.jpg?1507336120',
      //   name: 'Monk Parakeet (Myiopsitta monachus)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/97837/square.jpg?1545352960',
      //   name: 'Amazon Parrots (Genus Amazona)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/2035460/square.jpg?1435009101',
      //   name: 'Rose-ringed Parakeet (Psittacula krameri)',
      // },
      // {
      //   type: 'aves',
      //   img:
      //     'https://static.inaturalist.org/photos/133039/square.jpg?1544530184',
      //   name: 'New Zealand Parrots (Family Strigopidae)',
      // },
    ]);
  }
  ngOnInit(): void {}
}

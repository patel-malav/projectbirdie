import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounce, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Ave } from 'src/app/type';
import { Router } from '@angular/router';

const query = gql`
  query search($term: String) {
    search(term: $term) {
      name
      sci
      defaultImage
      inatId
    }
  }
`;

@Component({
  selector: 'pb-search',
  template: `
    <form [formGroup]="searchForm">
      <mat-form-field appearance="outline">
        <mat-icon matPrefix>search</mat-icon>
        <mat-label>Search</mat-label>
        <input type="text" matInput formControlName="search" />
      </mat-form-field>
    </form>
    <div *ngIf="results | async" id="search-result">
      <ng-container *ngFor="let result of results | async">
        <pb-search-result
          type="ave"
          [img]="result.defaultImage"
          (click)="gotoAve(result.inatId)"
        >
          <h2>
            {{ result.name ? result.name : result.sci
            }}<small *ngIf="result.name">({{ result.sci }})</small>
          </h2>
        </pb-search-result>
      </ng-container>
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  results: Observable<any>;
  searchForm: FormGroup;
  constructor(fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.searchForm = fb.group({
      search: [null],
    });

    this.results = this.searchForm.valueChanges.pipe(
      debounceTime(500),
      tap((term) => console.log(term)),
      switchMap(({ search }) => {
        console.log(search);
        return apollo.query<any>({ query, variables: { term: search } });
      }),
      map(({ data: { search } }) => search),
      tap((data) => console.log(data))
    );

    // apollo
    //   .query({ query, variables: { term: 'parrot' } })
    //   .subscribe((data) => console.log(data));

    // this.results = of([
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
    // ]);
  }
  ngOnInit(): void {}

  gotoAve(id: string) {
    this.searchForm.reset({ search: '' });
    this.router.navigate(['explore', 'ave', id]);
  }
}

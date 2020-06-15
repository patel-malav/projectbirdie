import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Observation } from 'src/app/type';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { DataBusService } from 'src/app/data-bus.service';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, switchMap, map } from 'rxjs/operators';
import gql from 'graphql-tag';

const query = gql`
  query observations($ids: [Int]!) {
    observations(ids: $ids) {
      id
      date
      quality
      coord
      images
      createdAt
    }
  }
`;

@Component({
  selector: 'pb-observation',
  template: `
    <ng-container *ngIf="observation | async as data; else spinner">
      <article *ngFor="let item of data">
        <h3>
          <span>Grade: {{ item.quality | titlecase }}</span>
          <span>Date: {{ item.date | date }}</span>
        </h3>
        <div class="showcase">
          <img *ngFor="let image of item.images" [src]="image" />
        </div>
        <h4><b>Location</b>: {{ item.coord[0] }}, {{ item.coord[1] }}</h4>
      </article>
    </ng-container>
    <ng-template #spinner>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit, OnDestroy {
  observation: Observable<Observation[]>;
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private bus: DataBusService,
    public santizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.observation = this.route.params.pipe(
      tap((_) => ++this.bus.reqCount),
      map(({ ids }) => ids.split(',').map((v: string) => parseInt(v, 10))),
      tap((ids) => console.log(ids)),
      switchMap((ids) =>
        this.apollo.query<any>({
          query,
          variables: {
            ids,
          },
        })
      ),
      tap((_) => --this.bus.reqCount),
      map(({ data: { observations } }) => observations)
    );

    // this.route.params.subscribe(({ ids }) =>
    //   console.log(ids.split(',').map((v: string) => parseInt(v, 10)))
    // );

    // this.apollo
    //   .query<any>({
    //     query,
    //     variables: { ids: [49693660, 49705195, 49701962] },
    //   })
    //   .subscribe((resp) => console.log(resp.data));

    this.observation.subscribe((data) => console.log(data));
  }
  ngOnDestroy(): void {}
}

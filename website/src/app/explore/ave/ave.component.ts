import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { switchMap, tap, map } from 'rxjs/operators';
import { DataBusService } from 'src/app/data-bus.service';
import { Observable } from 'rxjs';
import { Ave } from 'src/app/type';
import { DomSanitizer } from '@angular/platform-browser';

const query = gql`
  query ave($id: ID!) {
    ave(id: $id) {
      sci
      name
      defaultImage
      images
      extinct
      inatId
      wiki
      descp
      speciesCount
    }
  }
`;

@Component({
  selector: 'pb-ave',
  template: `
    <ng-container *ngIf="ave | async as data; else spinner">
      <img [src]="data.defaultImage" />
      <h2>
        <span>{{ data.name ? data.name : data.sci }}</span>
        <br />
        <small *ngIf="data.name">({{ data.sci }})</small>
      </h2>
      <h3>
        <span>Status : {{ data.extinct ? 'Extinct' : 'No' }}</span>
        <span>Species Count : {{ data.speciesCount }}</span>
      </h3>
      <article>
        <p [innerHTML]="santizer.bypassSecurityTrustHtml(data.descp)"></p>
        <h3>
          <a [href]="santizer.bypassSecurityTrustUrl(data.wiki)">Wikipedia</a>
          <a [href]="'https://www.inaturalist.org/taxa/' + data.inatId"
            >INaturalist</a
          >
        </h3>
      </article>
    </ng-container>
    <ng-template #spinner>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styleUrls: ['./ave.component.scss'],
})
export class AveComponent implements OnInit, OnDestroy {
  ave: Observable<Ave>;
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private bus: DataBusService,
    public santizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.ave = this.route.params.pipe(
      tap((_) => ++this.bus.reqCount),
      switchMap(({ id }) =>
        this.apollo.query<any>({ query, variables: { id } })
      ),
      tap((_) => --this.bus.reqCount),
      map(({ data: { ave } }) => ave)
    );

    this.ave.subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {}
}

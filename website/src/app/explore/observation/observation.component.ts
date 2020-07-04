import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Observation } from 'src/app/type';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { DataBusService } from 'src/app/data-bus.service';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, switchMap, map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Bird } from '../three/bird';
import { ExploreService } from '../explore.service';
import { Country } from '../three/country.object';

const query = gql`
  query observations($ids: [Int]!) {
    observations(ids: $ids) {
      id
      date
      quality
      coord
      images
      createdAt
      country {
        code
        short
        flag
      }
      ave {
        sci
        name
        defaultImage
      }
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
          <img
            class="show-item"
            *ngFor="let image of item.images"
            [src]="image"
          />
        </div>
        <h4>
          <img class="thumb" [src]="item.country.flag" />
          <span>Country: {{ item.country.short }},{{ item.country.code }}</span>
        </h4>
        <h4>
          <img class="thumb" [src]="item.ave.defaultImage" />
          <span>{{ item.ave.name ? item.ave.name : item.ave.sci }}</span>
          <span *ngIf="item.ave.name">({{ item.ave.sci }})</span>
        </h4>
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
  birds: Bird[] = [];
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private bus: DataBusService,
    public santizer: DomSanitizer,
    private explore: ExploreService
  ) {}

  ngOnInit(): void {
    this.observation = this.route.params.pipe(
      tap((_) => ++this.bus.reqCount),
      map(({ ids }) => ids.split(',').map((v: string) => parseInt(v, 10))),
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
    setTimeout(() => {
      this.observation
        .pipe(
          switchMap((data) => from(data)),
          map(({ coord, country: { code }, ave: { name } }: any) => {
            return { coord, code, name };
          })
        )
        .subscribe(({ coord, code, name }) => this.addBird(coord, code, name));
    }, 24000);
  }

  ngOnDestroy(): void {
    this.removeBird();
  }

  async addBird(coords: number[], country: string, name?: string) {
    const bird = new Bird(
      coords,
      this.explore.scene.getObjectByName(country) as Country,
      name
    );
    bird.model = this.explore.birdModel;
    bird.changeColor = 0xff0000;
    this.birds.push(bird);
  }
  async removeBird() {
    this.birds.forEach((bird) => this.explore.scene.remove(bird));
  }
}

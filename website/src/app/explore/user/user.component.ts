import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/type';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { DataBusService } from 'src/app/data-bus.service';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, switchMap, map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { ExploreService } from '../explore.service';
import { Bird } from '../three/bird';
import { Country } from '../three/country.object';

const query = gql`
  query user($id: Int!) {
    user(id: $id) {
      name
      image
      descp
      inatId
    }
  }
`;

@Component({
  selector: 'pb-user',
  template: `
    <ng-container *ngIf="user | async as data; else spinner">
      <img [src]="data.image" />
      <h2>{{ data.name }}</h2>
      <article>
        <p [innerHTML]="santizer.bypassSecurityTrustHtml(data.descp)"></p>
        <h3>
          <a [href]="'https://www.inaturalist.org/people/' + data.inatId">
            INaturalist
          </a>
        </h3>
      </article>
    </ng-container>
    <ng-template #spinner>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: Observable<User>;
  birds: Bird[];
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private bus: DataBusService,
    public santizer: DomSanitizer,
    private explore: ExploreService
  ) {}

  ngOnInit(): void {
    this.user = this.route.params.pipe(
      tap((_) => ++this.bus.reqCount),
      switchMap(({ id }) =>
        this.apollo.query<any>({ query, variables: { id: parseInt(id, 10) } })
      ),
      tap((_) => --this.bus.reqCount),
      map(({ data: { user } }) => user)
    );
    this.user.subscribe((data) => console.log(data));

    setTimeout(() => {}, 24000);
  }

  ngOnDestroy(): void {
    this.removeBird();
  }

  async addBird(coords: number[], country: string, name?: string) {
    const bird = new Bird(
      coords,
      this.explore.scene.getObjectByName('IND') as Country,
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

import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { ExploreService } from './explore.service';
import { BehaviorSubject } from 'rxjs';
import { Earth } from './three/earth.object';
import { Colors } from './three/colors';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DataBusService } from '../data-bus.service';

const countries = gql`
  {
    countries {
      id
    }
  }
`;

@Component({
  selector: 'pb-explore',
  template: `
    <div id="aside">
      <div id="info-panel">
        <h2><span>Location</span> : <span>The World</span></h2>
        <h2><span>Observations</span> : <span>5,906,145</span></h2>
        <h2><span>Species</span> : <span>9,754</span></h2>
      </div>
      <div id="data-panel">
        <h2>Search or Click below</h2>
        <div id="random-panel">
          Random
          <button mat-fab color="primary" (click)="random(choice.value)">
            <mat-icon>explore</mat-icon>
          </button>
          <mat-form-field color="warn">
            <mat-label>Choice</mat-label>
            <mat-select #choice value="ave" color="warn">
              <mat-option value="ave">Birds/Aves</mat-option>
              <mat-option value="observation">Observations</mat-option>
              <mat-option value="user">Users</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <ng-container *ngIf="(selection | async).name">
          <h2>
            <span>Name</span>:<span>{{ (selection | async).name }}</span>
          </h2>
        </ng-container>
      </div>
      <div id="ui-panel">
        <h2>
          Toggle : <button mat-raised-button color="warn">Countries</button>
          <button mat-raised-button color="warn">Birds</button>
          <button mat-raised-button color="warn">Ocean</button>
        </h2>
        <h2>
          <button mat-icon-button color="primary">
            <mat-icon>arrow_back</mat-icon>
          </button>
          objects <sub>{{ objectsCount$ | async }}</sub>
          <mat-slider
            (change)="objectsCount$.next($event.value)"
            value="45"
            max="200"
            color="primary"
          ></mat-slider>
          200
          <button mat-icon-button color="primary">
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </h2>
      </div>
    </div>
    <div #container id="container">
      <canvas #canvas></canvas>
    </div>
    <pb-search></pb-search>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  route = new BehaviorSubject<string>(null);
  objectsCount$ = new BehaviorSubject<number>(45);
  selection = new BehaviorSubject<{ [key: string]: any }>({});
  earth: Earth;

  @ViewChild('container')
  private container: ElementRef;
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;

  constructor(private explore: ExploreService) {}

  ngOnInit(): void {
    this.explore.setCanvas = this.canvas.nativeElement;
    this.explore.start();

    this.explore.resize(
      this.canvas.nativeElement.clientWidth,
      this.canvas.nativeElement.clientHeight
    );
  }
  ngOnDestroy(): void {}

  @HostListener('window:resize')
  onResize() {
    this.explore.resize(
      this.container.nativeElement.clientWidth,
      this.container.nativeElement.clientHeight
    );
  }

  random(choice: string) {
    console.log(choice);
  }
}

import { Component, OnInit } from '@angular/core';
import { DataBusService } from './data-bus.service';

@Component({
  selector: 'pb-root',
  template: `
    <pb-header></pb-header>
    <pb-nav></pb-nav>
    <mat-progress-bar
      [value]="100"
      [mode]="bus.reqCount > 0 ? 'indeterminate' : 'determinate'"
      color="warn"
    ></mat-progress-bar>
    <router-outlet></router-outlet>
    <pb-footer></pb-footer>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public bus: DataBusService) {}
  ngOnInit() {}
}

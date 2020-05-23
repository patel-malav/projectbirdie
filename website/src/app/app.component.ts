import { Component } from '@angular/core';
import { DataBusService } from './data-bus.service';

@Component({
  selector: 'pb-root',
  template: `
    <pb-header></pb-header>
    <mat-progress-bar
      [value]="bus.progbar.value"
      [mode]="bus.progbar.mode"
      color="warn"
    ></mat-progress-bar>
    <section>
      <router-outlet></router-outlet>
    </section>
    <pb-footer></pb-footer>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public bus: DataBusService) {}
}

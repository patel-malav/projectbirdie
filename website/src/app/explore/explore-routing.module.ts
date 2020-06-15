import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './explore.component';
import { AveComponent } from './ave/ave.component';
import { ObservationComponent } from './observation/observation.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    children: [
      {
        path: 'ave/:id',
        pathMatch: 'full',
        component: AveComponent,
      },
      {
        path: 'observation/:ids',
        pathMatch: 'full',
        component: ObservationComponent,
      },
      {
        path: 'user/:id',
        pathMatch: 'full',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}

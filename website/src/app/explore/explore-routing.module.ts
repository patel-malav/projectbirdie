import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './explore.component';

const routes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    // children: [
    //   {
    //     path: 'aves/:term',
    //     pathMatch: 'full',
    //     component: AvesComponent,
    //   },
    //   {
    //     path: 'observation/:id',
    //     pathMatch: 'full',
    //     component: ObservationComponent,
    //   },
    //   {
    //     path: 'user/:name',
    //     pathMatch: 'full',
    //     component: UserComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { ExploreRoutingModule } from './explore-routing.module';
import { SearchComponent } from './search/search.component';
import { AveComponent } from './ave/ave.component';
import { ObservationComponent } from './observation/observation.component';
import { UserComponent } from './user/user.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SearchResultComponent } from './search-result/search-result.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ExploreComponent,
    SearchComponent,
    AveComponent,
    ObservationComponent,
    UserComponent,
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class ExploreModule {}

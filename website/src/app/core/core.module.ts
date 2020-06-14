import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccountComponent } from './account/account.component';
import { ContributeComponent } from './contribute/contribute.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    AccountComponent,
    ContributeComponent,
    WatchlistComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    SharedModule,
  ],
})
export class CoreModule {}

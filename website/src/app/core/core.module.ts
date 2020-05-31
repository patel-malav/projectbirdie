import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccountComponent } from './account/account.component';
import { ContributeComponent } from './contribute/contribute.component';

@NgModule({
  declarations: [ProfileComponent, AccountComponent, ContributeComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
})
export class CoreModule {}

import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'pb-account',
  template: `
  <h1>Account</h1>
    <!-- <div id="option-panel">
      <a
        routerLink="/account/login"
        routerLinkActive="active"
        mat-stroked-button
        >Login</a
      >
      <a
        routerLink="/account/register"
        routerLinkActive="active"
        mat-stroked-button
        >Register</a
      >
    </div>
    <div id="container">
      <router-outlet></router-outlet>
    </div>
    <div id="info-panel">
      <h1>Info Panel</h1>
    </div> -->
  `,
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    iconReg: MatIconRegistry,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    iconReg.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg')
    );
    iconReg.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/facebook.svg')
    );
    iconReg.addSvgIcon(
      'twitter',
      sanitizer.bypassSecurityTrustResourceUrl('assets/twitter.svg')
    );
  }

  ngOnInit(): void {
    this.route.url.subscribe((route) => {
      console.log(route);
    });
  }
}

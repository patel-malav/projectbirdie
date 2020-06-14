import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { QueryOptions } from 'apollo-client';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataBusService {
  reqCount = 0;

  constructor(
    iconReg: MatIconRegistry,
    sanitizer: DomSanitizer,
    private apollo: Apollo
  ) {
    // Load SVG Icons
    const icons = ['google', 'facebook', 'twitter'];
    icons.forEach((icon) => {
      iconReg.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}.svg`)
      );
    });
  }
}

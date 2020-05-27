import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

enum Mode {
  known = 'determinate',
  unknown = 'indeterminate',
}

@Injectable({
  providedIn: 'root',
})
export class DataBusService {
  progbar = {
    value: 100,
    mode: Mode.known,
  };
  constructor(iconReg: MatIconRegistry, sanitizer: DomSanitizer) {
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

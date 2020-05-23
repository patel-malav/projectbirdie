import { Injectable } from '@angular/core';

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
    mode: Mode.unknown
  };
  constructor() {}
}

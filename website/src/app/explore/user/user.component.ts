import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-user',
  template: `
    <p>
      user works!
    </p>
  `,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'pb-user',
  template: `
    <h1>User</h1>
    <p>{{ auth.user$ | async | json }}</p>
  `,
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}

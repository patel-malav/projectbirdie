import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-footer',
  template: `
    <h3>Made with ❤️ by</h3>
    <h3><a href="https://github.com/patel-malav">Malav Patel</a></h3>
    <h3>&copy; {{ today | date: 'yyyy' }}</h3>
    <h3><a href="https://www.instagram.com/baba_.7/">Shrey Patel</a></h3>
    <h3><a href="https://github.com/patel-malav/projbirdie">GitHub</a></h3>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  today = Date.now();
  constructor() {}

  ngOnInit(): void {}
}

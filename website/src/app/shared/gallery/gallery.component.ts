import { Component, OnInit, Input } from '@angular/core';

interface Image {
  name: string;
  url: string;
  wide?: boolean;
  tall?: boolean;
}

@Component({
  selector: 'pb-gallery',
  template: `
    <ng-container *ngFor="let image of images">
      <div
        class="img"
        [ngClass]="{ 'img-tall': image.tall, 'img-wide': image.wide }"
        [ngStyle]="{ 'background-image': 'url(' + image.url + ')' }"
      >
        {{ image.name }}
      </div>
    </ng-container>
  `,
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() images: Image[] = [
    {
      name: 'malav',
      tall: true,
      wide: true,
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      name: 'malav',
      url:
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
  ];

  test = 'malav';

  constructor() {}

  ngOnInit(): void {}
}

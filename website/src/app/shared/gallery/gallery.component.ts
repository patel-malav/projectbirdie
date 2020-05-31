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
        'assets/placeholder.png',
    },
    {
      name: 'malav',
      url:
        'assets/placeholder.png',
    },
    {
      name: 'malav',
      url:
        'assets/placeholder.png',
    },
    {
      name: 'malav',
      url:
        'assets/placeholder.png',
    },
    {
      name: 'malav',
      url:
        'assets/placeholder.png',
    },
    {
      name: 'malav',
      url:
        'assets/placeholder.png',
    },
    // {
    //   name: 'malav',
    //   url:
    //     'assets/placeholder.png',
    // },
    // {
    //   name: 'malav',
    //   url:
    //     'assets/placeholder.png',
    // },
    // {
    //   name: 'malav',
    //   url:
    //     'assets/placeholder.png',
    // },
  ];

  test = 'malav';

  constructor() {}

  ngOnInit(): void {}
}

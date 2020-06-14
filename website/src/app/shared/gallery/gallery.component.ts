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
        <span>{{ image.name }}</span>
      </div>
    </ng-container>
  `,
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() images: Image[] = [
    {
      name: 'Yellow-bellied Sunbird-Asity',
      tall: true,
      wide: true,
      url: 'https://static.inaturalist.org/photos/3890846/large.jpg?1545888541',
    },
    {
      name: 'Barred Owl',
      url:
        'https://static.inaturalist.org/photos/42714528/large.jpg?1561230519',
    },
    {
      name: 'Southern Brownhood Kingfisher',
      url:
        'https://static.inaturalist.org/photos/77357724/large.jpeg?1591504211',
    },
    {
      name: 'Thick-billed Raven',
      url: 'https://static.inaturalist.org/photos/9872415/large.jpg?1503184241',
    },
    {
      name: 'Cordilleran Flycatcher',
      url:
        'https://static.inaturalist.org/photos/77551926/large.jpg?1591579580',
    },
    {
      name: 'Ring-billed Gull',
      url:
        'https://static.inaturalist.org/photos/77572344/large.jpg?1591587516',
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

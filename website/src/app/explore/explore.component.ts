import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { ExploreService } from './explore.service';
import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';

@Component({
  selector: 'pb-explore',
  template: `
    <div id="aside">
      <h1>Side</h1>
    </div>
    <div #container id="container">
      <canvas #canvas></canvas>
    </div>
    <pb-search></pb-search>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  @ViewChild('container')
  private container: ElementRef;
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;

  constructor(private explore: ExploreService) {}

  ngOnInit(): void {
    this.explore.setCanvas = this.canvas.nativeElement;
    this.explore.start();

    const geometey = new BoxBufferGeometry(4, 4, 4);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const box = new Mesh(geometey, material);
    this.explore.resize(
      this.canvas.nativeElement.clientWidth,
      this.canvas.nativeElement.clientHeight
    );
    this.explore.addObject(box);
  }
  ngOnDestroy(): void {}

  @HostListener('window:resize')
  onResize() {
    this.explore.resize(
      this.container.nativeElement.clientWidth,
      this.container.nativeElement.clientHeight
    );
  }
}

import { Injectable, NgZone } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  Scene,
  PerspectiveCamera,
  Light,
  DirectionalLight,
  WebGLRenderer,
  Object3D,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  // Rxjs Subs
  // private subs: Subscription[] = [];
  // Canvas
  private canvas$ = new Subject<HTMLCanvasElement>();
  // Three Globals
  private scene: Scene = new Scene();
  private camera: PerspectiveCamera = new PerspectiveCamera();
  private light: Light = new DirectionalLight();
  private renderer: WebGLRenderer;
  private control: OrbitControls;

  constructor(private ngZone: NgZone) {
    console.warn(`Explore Service Created...`);
    /**
     * Camera Setup
     */
    {
      this.camera.position.set(0, 0, 10);
      this.camera.fov = 75;
      this.camera.near = 1;
      this.camera.far = 50;
      this.camera.updateProjectionMatrix();
      this.scene.add(this.camera);
    }
    /**
     * Light Setup
     */
    {
      // this.light.lookAt(0,0,0);
      this.camera.add(this.light);
    }
    this.canvas$.subscribe((canvas) => this.init(canvas));
    // const sub = this.canvas$.subscribe((canvas) => this.init(canvas));
    // this.subs.push(sub);
  }

  /**
   * This method is invoked every time canvas is created.
   * @param canvas Current Rendering Canvas
   */
  private init(canvas: HTMLCanvasElement) {
    /**
     * Renderer Setup
     */
    {
      this.renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    /**
     * Controller Setup
     */
    {
      this.control = new OrbitControls(this.camera, canvas);
      this.control.minDistance = 6;
      this.control.maxDistance = 10;
      // this.control.autoRotate = true;
      // this.control.autoRotateSpeed = 1;
      this.control.enableKeys = false; // Use keys to move
      // this.control.enableZoom = false; // Zoom
      this.control.enablePan = false; // Move the camera
      this.control.enableDamping = true; // Weight to controls
      this.control.zoomSpeed = 0.4;
    }
  }

  private render(): void {
    this.ngZone.runOutsideAngular(() => {
      this.control.update();
      this.renderer.render(this.scene, this.camera);
    });
  }

  public set setCanvas(canvas: HTMLCanvasElement) {
    this.canvas$.next(canvas);
  }

  public resize(width: number, height: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  public start(): void {
    // tslint:disable-next-line: no-console
    console.info('Rendering Started...');
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  public stop(): void {
    this.renderer.setAnimationLoop(null);
    // tslint:disable-next-line: no-console
    console.info('Rendering Stopped...');
  }

  public removeObject(thing: any, target?: any): void {}

  public addObject(obj: Object3D, target?: string): void {
    if (!target || target === 'scene') {
      this.scene.add(obj);
    } else {
      this.scene.getObjectByName(target).add(obj);
    }
  }

  public hasObject(obj: string, target?: string): boolean {
    if (!target || target === 'scene') {
      return !!this.scene.getObjectByName(obj);
    }
  }
}

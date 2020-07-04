import { Injectable, NgZone } from '@angular/core';
import { Subject, from, asyncScheduler } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { tap, switchMap } from 'rxjs/operators';

import {
  Scene,
  PerspectiveCamera,
  Light,
  DirectionalLight,
  WebGLRenderer,
  Object3D,
  FontLoader,
  Font,
  Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader2Parallel } from 'three/examples/jsm/loaders/OBJLoader2Parallel';
import { Earth } from './three/earth.object';

import { DataBusService } from '../data-bus.service';
import { Country } from './three/country.object';
import { Colors, greenShade } from './three/colors';
import { Text } from './three/text.mesh';
import { Bird } from './three/bird';
import { Binoculars } from './three/binoculars';

const countries = gql`
  {
    countries {
      code
      short
      model {
        path
        level
        fontSize
        fontHeight
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  // Canvas
  private canvas$ = new Subject<HTMLCanvasElement>();
  // Three Globals
  public scene: Scene = new Scene();
  private camera: PerspectiveCamera = new PerspectiveCamera();
  private light: Light = new DirectionalLight();
  private renderer: WebGLRenderer;
  private control: OrbitControls;
  private countryLoader = new OBJLoader2Parallel();
  private fontLoader = new FontLoader();
  private font: Promise<Font>;
  public birdModel: Bird;
  public binocularsModel: Binoculars;

  constructor(
    private ngZone: NgZone,
    private bus: DataBusService,
    private apollo: Apollo
  ) {
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

    // Load Font
    this.ngZone.runOutsideAngular(async () => {
      this.font = this.fontLoader.loadAsync(
        '/assets/optimer_regular.typeface.json'
      );
    });

    // Add Earth Base Object
    {
      const earth = new Earth();
      earth.surfaceColor = Colors.SURFACE;
      // earth.wireframe = true;
      this.addObject(earth);
    }

    // Add Countries
    this.ngZone.runOutsideAngular(() => {
      ++this.bus.reqCount;
      apollo
        .query<{
          countries: {
            code: string;
            short: string;
            model: {
              level: number;
              path: string;
              fontSize: number;
              fontHeight: number;
            };
          }[];
        }>({
          query: countries,
        })
        .pipe(tap(() => --this.bus.reqCount))
        .subscribe(async (resp) => {
          for (const country of resp.data.countries) {
            const obj = new Country(country.code);
            this.addObject(obj, 'Earth');
            if (country.model) {
              ++this.bus.reqCount;
              obj.model = await this.countryLoader.loadAsync(
                country.model.path
              );
              --this.bus.reqCount;
              obj.changeColor = greenShade[country.model.level];
              obj.text = new Text(country.short, await this.font, {
                pos: new Vector3().copy(await obj.center),
                fontHeight: country.model.fontHeight,
                fontSize: country.model.fontSize,
              });
            }
          }
        });
    });

    // Test Add Bird
    this.ngZone.runOutsideAngular(async () => {
      ++this.bus.reqCount;
      this.birdModel = await new OBJLoader2Parallel().loadAsync(
        '/assets/bird.obj'
      );
      --this.bus.reqCount;
      ++this.bus.reqCount;
      this.binocularsModel = await new OBJLoader2Parallel().loadAsync(
        '/assets/binoculars.obj'
      );
      --this.bus.reqCount;
    });
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
      // this.control.minDistance = 6;
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

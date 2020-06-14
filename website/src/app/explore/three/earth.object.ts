import {
  Object3D,
  Mesh,
  MeshToonMaterial,
  SphereBufferGeometry,
  AxesHelper,
} from 'three';
import { Colors } from './colors';
// import { colors } from 'src/environments/environment';

const radius = 4;
const segments = 32;

export class Earth extends Object3D {
  constructor() {
    super();
    this.name = 'Earth';
    const geometry = new SphereBufferGeometry(radius, segments, segments);
    const material = new MeshToonMaterial({ color: Colors.SURFACE });
    const surface = new Mesh(geometry, material);
    surface.name = 'Surface';
    this.add(surface);
    this.add(new AxesHelper(5));
  }
  public set surfaceColor(v: number) {
    const material = (this.children[0] as Mesh).material as MeshToonMaterial;
    material.color.setHex(v);
    material.needsUpdate = true;
  }
  public set wireframe(v: boolean) {
    const material = (this.children[0] as Mesh).material as MeshToonMaterial;
    material.wireframe = v;
  }
}

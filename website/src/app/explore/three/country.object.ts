import { Object3D, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { Text } from './text.mesh';

export class Country extends Object3D {
  center: Promise<Vector3>;
  constructor(public name: string, public level?: number) {
    super();
  }
  /**
   * Set 3D model
   */
  public set model(obj: Object3D) {
    const body = obj.children[0] as Mesh;
    body.scale.set(6, 6, 6);
    body.material = new MeshStandardMaterial();
    this.add(body);
    this.center = new Promise((res) => {
      body.geometry.computeBoundingSphere();
      res(body.geometry.boundingSphere.center);
    });
  }
  /**
   * Change Color
   */
  public set changeColor(color: number) {
    const material = (this.children[0] as Mesh)
      .material as MeshStandardMaterial;
    material.color.setHex(color);
    material.needsUpdate = true;
  }

  public set lift(value: number) {
    this.scale.addScalar(value * 0.01);
  }

  public set text(name: Text) {
    this.add(name);
  }
}

import {
  Object3D,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  BoxGeometry,
} from 'three';
import { Country } from './country.object';

export class Bird extends Object3D {
  constructor(coord: number[], country: Country, public name = 'Bird') {
    super();
    this.position.copy(translateLatLong(coord[0], coord[1]));
    country.add(this);
  }

  public set model(obj: Object3D) {
    const clone = obj.clone();
    clone.scale.set(2, 2, 2);
    // const lookPos = new Vector3(
    //   this.position.x + Math.random() < 0.5 ? 1 : -1,
    //   this.position.y + Math.random() < 0.5 ? 1 : -1,
    //   this.position.z + Math.random() < 0.5 ? 1 : -1
    // );
    // obj.lookAt(lookPos);
    clone.name = 'HUM';
    this.add(clone);
  }

  public set changeColor(color: number) {
    const material = (this.children[0].children[0] as Mesh)
      .material as MeshStandardMaterial;
    material.color.setHex(color);
    material.needsUpdate = true;
  }
}

function translateLatLong(lat: number, long: number, alti = 0.15, radius = 4) {
  radius += alti;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 165) * (Math.PI / 180);

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

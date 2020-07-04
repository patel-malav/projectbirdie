import {
  Line,
  Vector3,
  Geometry,
  CurvePath,
  QuadraticBezierCurve3,
  Object3D,
  LineBasicMaterial,
} from 'three';
import { Country } from './country.object';
import { Bird } from './bird';

export class Track extends Object3D {
  constructor(countries: Country[], birds?: Bird[]) {
    super();
    this.makeTrack(countries);
  }

  private async makeTrack(countries: Country[]) {
    const points: Vector3[] = [];
    for (const country of countries) {
      const vec = new Vector3()
        .copy(await country.center)
        .normalize()
        .multiplyScalar(4.2);
      points.push(vec);
    }
    const paths: Vector3[][] = [];
    for (let i = 0; i <= points.length - 2; i++) {
      const a = points[i];
      const c = points[i + 1];
      const b = new Vector3().addVectors(a, c).normalize().multiplyScalar(4.6);
      paths.push([a, b, c]);
    }
    const curve = new CurvePath<Vector3>();
    paths.forEach((path) => {
      curve.add(new QuadraticBezierCurve3(path[0], path[1], path[2]));
    });
    const geometry = new Geometry().setFromPoints(curve.getPoints(50));
    const material = new LineBasicMaterial({ color: 0xff0000 });
    const track = new Line(geometry, material);
    this.name = countries.map(({ name }) => name).join('-');
    this.add(track);
  }
}

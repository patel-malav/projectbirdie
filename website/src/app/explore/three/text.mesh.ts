import {
  Mesh,
  TextBufferGeometry,
  Font,
  MeshBasicMaterial,
  Vector3,
} from 'three';
import { Colors } from './colors';

interface Config {
  pos: Vector3;
  fontSize: number;
  fontHeight: number;
}

const blacklist = [
  'Kosovo',
  'Cuba',
  'Brazil',
  'Mali',
  'Niger',
  'Guinea',
  'French Guiana',
  'Togo',
  'United Arab Emirates',
  'Vietnam',
];

export class Text extends Mesh {
  static material = new MeshBasicMaterial({ color: Colors.BLACK });
  constructor(text: string, font: Font, config: Config) {
    super();
    this.name = 'Text';
    this.material = Text.material;
    this.geometry = new TextBufferGeometry(text, {
      font,
      size: config.fontSize * 0.015,
      height: 0.01,
    });
    this.lookAt(config.pos.multiplyScalar(6 + config.fontHeight * 0.1));
    this.position.copy(config.pos);
    if (!blacklist.includes(text)) {
      this.geometry.center();
    }
  }
}

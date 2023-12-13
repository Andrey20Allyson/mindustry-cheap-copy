import { Floor } from "./Floor";

export class Grass extends Floor {
  constructor(x: number, y: number) {
    super(x, y, 1, 'grass-0');
  }
}
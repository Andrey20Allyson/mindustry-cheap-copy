import { Chunk } from "../chunk";
import { Floor } from "./Floor";

export class Grass extends Floor {
  constructor(chunk: Chunk, x: number, y: number) {
    super(chunk, x, y, 1, 'grass-0');
  }
}
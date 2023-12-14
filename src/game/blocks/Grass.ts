import { BlockPosition } from "./Block.position";
import { Floor } from "./Floor";

export class Grass extends Floor {
  constructor(position: BlockPosition) {
    super(position, 1, 'grass-0');
  }
}
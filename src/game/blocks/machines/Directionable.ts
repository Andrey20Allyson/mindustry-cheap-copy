import { Chunk } from "../../chunk";
import { Machine } from "./Machine";

export enum DirectionValue {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class Direction {
  readonly value: DirectionValue;

  constructor(value: DirectionValue = DirectionValue.UP) {
    this.value = value;
  }

  toVector2() {
    switch (this.value) {
      case DirectionValue.UP:
        return new Phaser.Math.Vector2(0, -1);
      case DirectionValue.DOWN:
        return new Phaser.Math.Vector2(0, 1);
      case DirectionValue.LEFT:
        return new Phaser.Math.Vector2(-1, 0);
      case DirectionValue.RIGHT:
        return new Phaser.Math.Vector2(1, 0);
    }
  }

  apply(vector2: Phaser.Math.Vector2, multiplier: number): Phaser.Math.Vector2 {
    return this
      .toVector2()
      .multiply({ x: multiplier, y: multiplier })
      .add(vector2);
  }
}

export class Directionable extends Machine {
  direction: Direction;

  constructor(chunk: Chunk, x: number, y: number, size: number, texture: string) {
    super(chunk, x, y, size, texture);

    this.direction = new Direction();
  }
}
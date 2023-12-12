import Phaser from "phaser";
import { Chunk } from "../chunk";

export enum BlockType {
  FLOOR = 'block-type.floor',
  ORE = 'block-type.ore',
  MACHINE = 'block-type.machine',
  WALL = 'block-type.wall',
}

export class Block {
  static BLOCK_BASE_SIZE = 32;
  static TAG = 'blocks:block';
  sprite: Phaser.GameObjects.Sprite;
  readonly type: BlockType = BlockType.FLOOR;

  worldPosition: Readonly<Phaser.Geom.Point>;

  constructor(
    readonly chunk: Chunk,
    readonly x: number,
    readonly y: number,
    readonly size: number,
    readonly texture: string,
  ) {
    this.worldPosition = new Phaser.Geom.Point(
      x + chunk.worldPosition.x,
      y + chunk.worldPosition.y,
    );

    this.sprite = chunk.getScene().add.sprite(
      this.worldPosition.x * Block.BLOCK_BASE_SIZE,
      this.worldPosition.y * Block.BLOCK_BASE_SIZE,
      texture,
    );

    const finalSize = Block.BLOCK_BASE_SIZE * this.size;

    this.sprite.setDisplaySize(finalSize, finalSize);

    this.chunk.insert(this);
  }

  get body() {
    return this.sprite.body;
  }

  destroy() {
    this.sprite.destroy();
  }

  update() { }

  static pixelsToBlockPos(worldX: number, worldY: number): Phaser.Geom.Point {
    const blockSize = Block.BLOCK_BASE_SIZE
    const blockHalfSize = blockSize / 2;

    const x = Math.floor((worldX + blockHalfSize) / blockSize);
    const y = Math.floor((worldY + blockHalfSize) / blockSize);

    return new Phaser.Geom.Point(x, y);
  }
}
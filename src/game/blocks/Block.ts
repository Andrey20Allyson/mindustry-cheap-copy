import Phaser from "phaser";
import { services } from "..";
import { BlockPosition } from "./Block.position";

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
  readonly scene = services.get('game-scene');
  readonly workspace = services.get('workspace');
  
  constructor(
    readonly position: BlockPosition,
    readonly size: number,
    readonly texture: string,
  ) {
    this.sprite = this.initSprite();

    this.workspace.chunkRouter.put(this);
  }
  
  initSprite() {
    const sprite = this.scene.add.sprite(
      this.position.x * Block.BLOCK_BASE_SIZE,
      this.position.y * Block.BLOCK_BASE_SIZE,
      this.texture,
    );
  
    const finalSize = Block.BLOCK_BASE_SIZE * this.size;
  
    sprite.setDisplaySize(finalSize, finalSize);
  
    return sprite;
  }

  get body() {
    return this.sprite.body;
  }

  destroy() {
    this.sprite.destroy();
  }

  update() { }

  static pixelsToBlockPos(worldX: number, worldY: number): BlockPosition {
    const blockSize = Block.BLOCK_BASE_SIZE
    const blockHalfSize = blockSize / 2;

    const x = Math.floor((worldX + blockHalfSize) / blockSize);
    const y = Math.floor((worldY + blockHalfSize) / blockSize);

    return new BlockPosition(x, y);
  }
}
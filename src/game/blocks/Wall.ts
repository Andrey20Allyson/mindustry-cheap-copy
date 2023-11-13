import { Block, BlockType } from "./Block";

export class Wall extends Block {
  readonly type: BlockType = BlockType.WALL;
}
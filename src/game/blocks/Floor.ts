import { Block, BlockType } from "./Block";

export abstract class Floor extends Block {
  readonly type: BlockType = BlockType.FLOOR;
}
import { Block } from "../../blocks/Block";
import { Machine } from "../../blocks/machines/Machine";
import { Player } from "./Player";

export interface BlockFactory<B extends Block> {
  create(x: number, y: number): B;
}

export class BuildTool {
  blockFactory: BlockFactory<Machine> | null = null;
  speed: number = 1;

  constructor(
    readonly player: Player,
  ) { }

  build(x: number, y: number): Machine | null {
    if (this.blockFactory === null) return null;

    return this.blockFactory.create(x, y);
  }
}
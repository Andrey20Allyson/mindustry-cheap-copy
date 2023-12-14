import { Block } from "../../blocks/Block";
import { Machine } from "../../blocks/machines/Machine";
import { Player } from ".";
import { services } from "../..";

export interface BlockFactory<B extends Block> {
  create(x: number, y: number): B;
}

export class BuildTool {
  readonly player: Player = services.get('player');
  blockFactory: BlockFactory<Machine> | null = null;
  speed: number = 1;

  build(x: number, y: number): Machine | null {
    if (this.blockFactory === null) return null;

    return this.blockFactory.create(x, y);
  }
}
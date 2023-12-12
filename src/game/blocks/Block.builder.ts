import { Workspace } from "../workspace";
import { Block } from "./Block";
import { IBlockBuilder } from "./Builder";

export class BlockBuilder implements IBlockBuilder<Block> {
  constructor(
    readonly workspace: Workspace,
  ) { }

  create(x: number, y: number): Block {
    throw new Error('Method not implemented.');
  }
}
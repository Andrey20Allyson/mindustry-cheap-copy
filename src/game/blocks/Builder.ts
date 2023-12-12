import { Block } from "./Block";

export interface IBlockBuilder<T extends Block> {
  create(x: number, y: number): T;
}
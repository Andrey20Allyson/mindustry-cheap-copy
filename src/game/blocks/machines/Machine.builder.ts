import { Resource } from "../../resources/Resource";
import { IBlockBuilder } from "../Builder";
import { Machine } from "./Machine";

export class MachineBuilder implements IBlockBuilder<Machine> {
  cost: Resource[] = [];
  
  create(x: number, y: number): Machine {
    throw new Error('Method not implemented.');
  }
}
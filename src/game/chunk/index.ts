import { BlockType, Block } from "../blocks/Block";
import { Floor } from "../blocks/Floor";
import { Grass } from "../blocks/Grass";
import { Machine } from "../blocks/machines/Machine";
import { Ore } from "../blocks/Ore";
import { Wall } from "../blocks/Wall";
import { services } from "..";
import { Workspace } from "../services/Workspace";

export class Chunk {
  readonly width = 16;
  readonly height = 16;

  floors: Floor[];
  ores: Ore[];
  machines: Machine[];
  walls: Wall[];
  blocksPerLayer: number;

  readonly worldPosition: Phaser.Geom.Point;
  readonly workspace: Workspace;

  constructor(
    readonly x: number,
    readonly y: number,
  ) {
    this.workspace = services.get('workspace');
    this.blocksPerLayer = this.width * this.height;

    this.floors = new Array(this.blocksPerLayer);
    this.machines = new Array(this.blocksPerLayer);
    this.walls = new Array(this.blocksPerLayer);
    this.ores = new Array(this.blocksPerLayer);

    this.worldPosition = new Phaser.Geom.Point(
      this.x * this.width,
      this.y * this.height,
    );
  }

  load() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        new Grass(x, y);
      }
    }
  }

  insert(block: Block): this {
    let collection: Block[];

    switch (block.type) {
      case BlockType.FLOOR:
        collection = this.floors;
        break;
      case BlockType.ORE:
        collection = this.ores;
        break;
      case BlockType.MACHINE:
        collection = this.machines;
        break;
      case BlockType.WALL:
        collection = this.walls;
        break;
    }

    collection[this.indexFromPosition(block.x, block.y)] = block;
    return this;
  }

  indexFromPosition(x: number, y: number) {
    return y * this.width + x;
  }
}
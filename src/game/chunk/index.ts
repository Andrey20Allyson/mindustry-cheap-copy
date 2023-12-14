import { services } from "..";
import { Block, BlockType } from "../blocks/Block";
import { BlockPositionInChunk } from "../blocks/Block.position";
import { Floor } from "../blocks/Floor";
import { Grass } from "../blocks/Grass";
import { Ore } from "../blocks/Ore";
import { Wall } from "../blocks/Wall";
import { Machine } from "../blocks/machines/Machine";
import { ChunkCoords } from "./coords";

export class Chunk {
  floors: Floor[];
  ores: Ore[];
  machines: Machine[];
  walls: Wall[];
  blocksPerLayer: number;

  readonly workspace = services.get('workspace');

  constructor(
    readonly coords: ChunkCoords
  ) {
    this.blocksPerLayer = this.size ** 2;

    this.floors = new Array(this.blocksPerLayer);
    this.machines = new Array(this.blocksPerLayer);
    this.walls = new Array(this.blocksPerLayer);
    this.ores = new Array(this.blocksPerLayer);
  }

  get size() {
    return this.workspace.chunkRouter.chunkSize;
  }

  load() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const position = new BlockPositionInChunk(x, y, this.coords).toBlockPosition();

        new Grass(position);
      }
    }
  }

  collectionOf(type: BlockType): Block[] {
    switch (type) {
      case BlockType.FLOOR:
        return this.floors;
      case BlockType.ORE:
        return this.ores;
      case BlockType.MACHINE:
        return this.machines;
      case BlockType.WALL:
        return this.walls;
    }
  }

  at(type: BlockType, position: BlockPositionInChunk): Block | undefined {
    const collection = this.collectionOf(type);
    const index = position.toIndex();

    return collection[index];
  }

  put(block: Block): this {
    const collection = this.collectionOf(block.type);
    const index = block.position.toPositionInChunk().toIndex();

    collection[index] = block;
    return this;
  }
}
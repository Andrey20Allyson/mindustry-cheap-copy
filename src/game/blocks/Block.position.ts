import { services } from "..";
import { Position } from "../base";
import { ChunkCoords } from "../chunk/coords";
import { Workspace } from "../services/Workspace";

export class BlockPosition extends Position {
  readonly workspace = services.get('workspace');

  private getChunkSize(): number {
    return this.workspace.chunkRouter.chunkSize;

  }

  toChunkCoords(): ChunkCoords {
    const chunkSize = this.getChunkSize();

    return new ChunkCoords(
      Math.trunc(this.x / chunkSize),
      Math.trunc(this.y / chunkSize),  
    );
  }

  toPositionInChunk(): BlockPositionInChunk {
    const chunkCoords = this.toChunkCoords();
    const chunkSize = this.getChunkSize();

    return new BlockPositionInChunk(
      this.x - chunkCoords.x * chunkSize,
      this.y - chunkCoords.y * chunkSize,
      chunkCoords,
    );
  }

  serialize() {
    return `block-position: [${this.x}, ${this.y}]`;
  }
}

export class BlockPositionInChunk extends Position {
  readonly workspace: Workspace = services.get('workspace');

  constructor(
    x: number,
    y: number,
    readonly chunkCoords: ChunkCoords,
  ) {
    super(x, y);
  }

  getChunkSize() {
    return this.workspace.chunkRouter.chunkSize;
  }

  toBlockPosition() {
    const chunkSize = this.getChunkSize();

    return new BlockPosition(
      this.x + this.chunkCoords.x * chunkSize,
      this.y + this.chunkCoords.y * chunkSize,
    );
  }

  toIndex() {
    return this.y * this.getChunkSize() + this.x;
  }
}
import { BlockPosition } from "../blocks/Block.position";
import { Conveyor } from "../blocks/machines/Conveyor";
import { ChunkCoords } from "../chunk/coords";
import { ChunkRouter } from "../chunk/router";
import { ServiceLike } from "./lib/ServiceContainer";

export class Workspace implements ServiceLike {
  chunkRouter!: ChunkRouter;

  afterInit(): void {
    this.initChunks();
  }

  init(): void {
    this.chunkRouter = new ChunkRouter();
  }

  initChunks() {
    this.chunkRouter.create(new ChunkCoords(0, 0));
    this.chunkRouter.create(new ChunkCoords(0, 1));
    this.chunkRouter.create(new ChunkCoords(1, 0));

    for (const [_, chunk] of this.chunkRouter.chunks) {
      chunk.load();
    }

    new Conveyor(new BlockPosition(2, 5), 1, 'conveyor-0');
  }
}
import { services } from "..";
import { Position } from "../base";
import { BlockPosition } from "../blocks/Block.position";
import { Workspace } from "../services/Workspace";

export class ChunkCoords extends Position {
  readonly workspace: Workspace = services.get('workspace');

  toBlockPosition(x = 0, y = 0): BlockPosition {
    const chunkSize = this.workspace.chunkRouter.chunkSize;

    return new BlockPosition(
      x + this.x * chunkSize,
      y + this.y * chunkSize,
    );
  }
}
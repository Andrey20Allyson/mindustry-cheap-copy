import { Conveyor } from "../blocks/machines/Conveyor";
import { PlayerCameraHandler } from "../camera";
import { Chunk } from "../chunk";

export class Workspace {
  readonly chunks: Chunk[];
  readonly camera: PlayerCameraHandler;

  constructor(
    readonly scene: Phaser.Scene,
  ) {
    this.chunks = [];

    this.chunks.push(new Chunk(scene, 0, 0));

    for (const chunk of this.chunks) {
      chunk.load();

      new Conveyor(chunk, 0, 4, 1, 'conveyor-0');
    }

    this.camera = new PlayerCameraHandler(scene);
  }

  update(_time: number, _delta: number): void {
    this.camera.update();
  }
}
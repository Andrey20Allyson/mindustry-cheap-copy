import { Conveyor } from "../blocks/machines/Conveyor";
import { Chunk } from "../chunk";
import { Player } from "../player/Player";
import { GameScene } from "../scene";

export class Workspace {
  readonly chunks: Chunk[];
  readonly player: Player;

  constructor(
    readonly scene: GameScene,
  ) {
    this.chunks = [];

    this.chunks.push(new Chunk(this, 0, 0));

    for (const chunk of this.chunks) {
      chunk.load();

      new Conveyor(chunk, 0, 4, 1, 'conveyor-0');
    }

    this.player = new Player(this);
  }

  put() {
    
  }

  update(_time: number, _delta: number): void {
    this.player.update();
  }
}
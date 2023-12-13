import { Block } from "../blocks/Block";
import { Conveyor } from "../blocks/machines/Conveyor";
import { Chunk } from "../chunk";
import { ServiceLike } from "./lib/ServiceContainer";

export class Workspace implements ServiceLike {
  readonly chunks: Chunk[] = [];

  afterInit(): void {
    this.chunks.push(new Chunk(0, 0));

    console.log('workspace afterInit')

    this.initChunks();
  }

  init(): void { }

  initChunks() {
    console.log(new Block(0, 0, 1, 'nan'));

    for (const chunk of this.chunks) {
      chunk.load();

      new Conveyor(0, 4, 1, 'conveyor-0');
    }
  }
}
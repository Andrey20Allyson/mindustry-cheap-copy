import { services } from "../..";
import { Block } from "../../blocks/Block";
import { BlockPosition } from "../../blocks/Block.position";
import { EventEmitter } from "../../events/emitter";

export type ClickParams = [position: BlockPosition];

export class Mouse {
  readonly scene = services.get('game-scene');
  readonly events = {
    rightClick: new EventEmitter<ClickParams>(),
    leftClick: new EventEmitter<ClickParams>(),
  } as const;

  init() {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const point = Block.pixelsToBlockPos(pointer.worldX, pointer.worldY);

      switch (pointer.buttons) {
        case 1:
          this.events.leftClick.emit(point);
          break;
        case 2:
          this.events.rightClick.emit(point);
          break;
      }
    });
  }
}
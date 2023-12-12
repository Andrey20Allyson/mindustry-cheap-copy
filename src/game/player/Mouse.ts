import { Block } from "../blocks/Block";
import { EventEmitter } from "../events/emitter";
import { Workspace } from "../workspace";

export type ClickParams = [point: Phaser.Geom.Point];

export class Mouse {
  readonly events = {
    rightClick: new EventEmitter<ClickParams>(),
    leftClick: new EventEmitter<ClickParams>(),
  } as const;

  constructor(
    readonly workspace: Workspace,
  ) {
    this.initializeListeners();
  }
  
  private initializeListeners() {
    this.workspace.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
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
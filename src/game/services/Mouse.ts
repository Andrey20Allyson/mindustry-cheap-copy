import { services } from "..";
import { Block } from "../blocks/Block";
import { EventEmitter } from "../events/emitter";
import { GameScene } from "./GameScene";
import { ServiceLike } from "./lib/ServiceContainer";

export type ClickParams = [point: Phaser.Geom.Point];

export class Mouse implements ServiceLike {
  readonly events = {
    rightClick: new EventEmitter<ClickParams>(),
    leftClick: new EventEmitter<ClickParams>(),
  } as const;

  init(): void { }

  afterInit(): void {
    this.initializeListeners();
  }

  private initializeListeners() {
    const scene = services.get('game-scene');

    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
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
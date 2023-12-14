import Phaser from "phaser";
import { GameEvents } from "./GameEvents";
import { services } from "..";
import { ServiceLike } from "./lib/ServiceContainer";

export interface LoadableSprite {
  path: string;
  name: string;
}

const spritesToLoad: LoadableSprite[] = [{
  path: '/grass0.png',
  name: 'grass-0',
}, {
  path: '/conveyor0.png',
  name: 'conveyor-0',
}];

export class GameScene extends Phaser.Scene implements ServiceLike {
  gameEvents!: GameEvents;

  constructor() {
    super({ key: "MyScene" });
  }

  afterInit(): void { }

  init(): void {
    this.gameEvents = services.get('game-events');
  }

  preload() {
    for (const sprite of spritesToLoad) {
      this.load.image(sprite.name, sprite.path);
    }
  }

  create() {
    services.initialize();
  }

  update(time: number, delta: number): void {
    this.gameEvents.update.emit(time, delta);
  }
}
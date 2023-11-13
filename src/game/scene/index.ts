import Phaser from "phaser";
import { Workspace } from "../workspace";

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

export class GameScene extends Phaser.Scene {
  workspace!: Workspace;

  constructor() {
    super({ key: "MyScene" });
  }

  preload() {
    for (const sprite of spritesToLoad) {
      this.load.image(sprite.name, sprite.path);
    }
  }

  create() {
    this.workspace = new Workspace(this);
  }

  update(time: number, delta: number): void {
    this.workspace.update(time, delta);
  }
}
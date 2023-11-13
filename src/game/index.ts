import Phaser from "phaser";
import { GameScene } from "./scene";

let initalized = false;

export function init(canvas: HTMLCanvasElement) {
  if (initalized) return;
  initalized = true;

  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    canvas,
    width: canvas.clientWidth,
    height: canvas.clientHeight,
    scene: GameScene,
    fps: {
      limit: 40,
      forceSetTimeOut: true,
    },
  });

  return game;
}
import Phaser from "phaser";
import { GameEvents } from "./services/GameEvents";
import { GameScene } from "./services/GameScene";
import { Player } from "./services/Player";
import { PlayerCamera } from "./services/PlayerCamera";
import { Workspace } from "./services/Workspace";
import { ServiceContainer } from "./services/lib/ServiceContainer";

let initalized = false;

interface Services {
  'workspace': Workspace;
  'game-scene': GameScene;
  'game-events': GameEvents;
  'player-camera': PlayerCamera;
  'player': Player;
}

export const services = new ServiceContainer<Services>();

export function createServices() {
  services.create('workspace', Workspace);
  services.create('game-scene', GameScene);
  services.create('player', Player);
  services.create('game-events', GameEvents);
  services.create('player-camera', PlayerCamera);
}

export function init(canvas: HTMLCanvasElement) {
  if (initalized) return;
  initalized = true;

  createServices();

  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    canvas,
    width: canvas.clientWidth,
    height: canvas.clientHeight,
    scene: services.get('game-scene'),
    fps: {
      limit: 40,
      forceSetTimeOut: true,
    },
  });

  return game;
}
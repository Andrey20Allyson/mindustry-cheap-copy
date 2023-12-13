import { PlayerCameraHandler } from "../camera";
import { Resource } from "../resources/Resource";
import { Workspace } from "../workspace";
import { BuildTool } from "./BuildTool";
import { Mouse } from "./Mouse";

export class Player {
  camera: PlayerCameraHandler;
  buildTool: BuildTool;
  resources: Resource[] = [];
  mouse: Mouse;

  constructor(
    readonly workspace: Workspace,
  ) {
    this.camera = new PlayerCameraHandler(this.workspace.scene);
    this.buildTool = new BuildTool(this);

    this.mouse = new Mouse(this.workspace);

    this.mouse.events.leftClick.subscribe(point => {
      this.onClick(point.x, point.y);
    });
  }

  onClick(x: number, y: number): void {
    this.buildTool.build(x, y);
  }

  update() {
    this.camera.update();
  }
}
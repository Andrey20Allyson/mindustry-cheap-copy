import { Resource } from "../../resources/Resource";
import { Mouse } from "../Mouse";
import { services } from "../..";
import { ServiceLike } from "../lib/ServiceContainer";
import { BuildTool } from "./BuildTool";

export class Player implements ServiceLike {
  resources: Resource[] = [];
  buildTool!: BuildTool;
  mouse!: Mouse;
  
  init(): void {
    this.buildTool = new BuildTool(this);
    this.mouse = services.get('mouse');

    this.mouse.events.leftClick.subscribe(point => {
      this.onClick(point.x, point.y);
    });
  }

  afterInit(): void { }

  onClick(x: number, y: number): void {
    this.buildTool.build(x, y);
  }
}
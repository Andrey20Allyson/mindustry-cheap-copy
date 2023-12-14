import { Resource } from "../../resources/Resource";
import { Mouse } from "./Mouse";
import { ServiceLike } from "../lib/ServiceContainer";
import { BuildTool } from "./BuildTool";
import { BlockPosition } from "../../blocks/Block.position";

export class Player implements ServiceLike {
  resources: Resource[] = [];
  buildTool!: BuildTool;
  mouse!: Mouse;
  
  init(): void {
    this.buildTool = new BuildTool();
    this.mouse = new Mouse();
  }
  
  afterInit(): void {
    this.mouse.events.leftClick.subscribe(this.onClick, this);

    this.mouse.init();
  }

  onClick(position: BlockPosition): void {
    this.buildTool.build(position.x, position.y);
  }
}
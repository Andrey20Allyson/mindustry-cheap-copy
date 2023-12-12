import { Conveyor } from "../blocks/machines/Conveyor";
import { Machine } from "../blocks/machines/Machine";

export class BuildTool {
  Selected: typeof Machine;
  speed: number = 1;

  constructor() {
    this.Selected = Conveyor;
  }

  build(x: number, y: number): void {
    
  }
}
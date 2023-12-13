import { EventEmitter } from "../events/emitter";
import { ServiceLike } from "./lib/ServiceContainer";

export type UpdateEventParams = [time: number, delta: number];

export class GameEvents implements ServiceLike {
  update = new EventEmitter<UpdateEventParams>;

  afterInit(): void {
    
  }

  init(): void {
    
  }
}
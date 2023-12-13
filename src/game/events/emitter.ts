export type EventHandler<P extends any[]> = (...params: P) => void;
export type Unsubscribe = () => void;

export interface ListenerWithContext<P extends any[]> {
  handler: EventHandler<P>;
  context?: unknown;
}

export class EventEmitter<P extends any[] = []> {
  private listeners: ListenerWithContext<P>[] = [];

  unsubscribe(...handlers: EventHandler<P>[]): this {
    this.listeners = this.listeners.filter(listener => !handlers.includes(listener.handler));
    return this;
  }

  subscribe(handler: EventHandler<P>, thisArg?: unknown): Unsubscribe {
    this.listeners.push({ handler, context: thisArg });

    return () => this.unsubscribe(handler);
  }

  once(handler: EventHandler<P>, thisArg?: unknown): Unsubscribe {
    this.listeners.push({
      handler: (...params: P) => {
        this.unsubscribe(handler);
        handler.call(thisArg, ...params);
      },
      context: thisArg,
    });

    return () => this.unsubscribe(handler);
  }

  emit(...params: P): this {
    this.listeners.forEach(listener => listener.handler.call(listener.context, ...params));
    return this;
  }
}

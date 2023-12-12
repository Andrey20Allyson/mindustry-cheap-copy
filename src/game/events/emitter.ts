export type Listener<P extends any[]> = (...params: P) => void;

export class EventEmitter<P extends any[]> {
  private listeners: Listener<P>[] = [];
  
  unsubscribe(...listeners: Listener<P>[]): this {
    this.listeners = this.listeners.filter(listener => !listeners.includes(listener));
    return this;
  }
  
  subscribe(...listeners: Listener<P>[]): this {
    this.listeners.push(...listeners);
    return this;
  }

  once(...listener: Listener<P>[]) {
    this.listeners.push(...listener.map(listener => (...params: P) => {
      this.unsubscribe(listener);
      listener(...params);
    }));
    return this;
  }

  emit(...params: P): this {
    this.listeners.forEach(listener => listener(...params));
    return this;
  }
}

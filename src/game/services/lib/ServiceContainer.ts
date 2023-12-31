export interface ServiceLike {
  init(): void;
  afterInit(): void;
}

export type ServiceConstructor<T = ServiceLike> = (new () => T) & {
  $$serviceIndex?: number
};

export class ServiceContainer<SD extends object> {
  private services = {} as Record<string, ServiceLike>;

  create<K extends keyof SD & string>(name: K, Service: ServiceConstructor<SD[K] & ServiceLike>): void {
    const instance = new Service;

    this.services[name] = instance;
  }

  initialize() {
    for (const service of Object.values(this.services)) {
      service.init();
    }

    for (const service of Object.values(this.services)) {
      service.afterInit();
    }
  }

  get<K extends keyof SD & string>(name: K): SD[K] {
    const service = this.services[name];
    if (service === undefined) throw new Error(`Service ${name} has't initialized yet!`);

    return service as SD[K];
  }
}
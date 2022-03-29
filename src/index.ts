import { Comparator, QueuerConfig } from './types'

class Queuer<T> {
  // Local variable
  config: QueuerConfig<T> = {
    comparator: (a, b) => a > b,
    maxHeap: true,
    prioritized: false,
    capacity: Infinity,
    key: "priority",
  };
  heap: {
    key: number,
    val: T,
  }[] = [];
  size: number = 0;

  constructor(config: QueuerConfig<T>) {
    if (!config.prioritized && !config.comparator)
      throw Error("You must prioritize the element or give a comparator");

    if (config.prioritized && (
        !config.key ||
        !config.priorityGetter ||
        typeof config.priorityGetter != 'function'
      )
    )
      throw Error('You have to provide key or keyGetter');


    this.config = config;
  }

  heapify(arr: T[]) {
    this.queuing(arr);
  }

  queuing(arr: T[]) {
    return this.config.prioritized
      ? this.queuingWithPriority(arr)
      : this.queuingWithComparator(arr);
  }

  private getPriority(val: T): number {
    const key = this.config.key || "";
    if (
      val !== null &&
      typeof val === "object" &&
      key in val
    )
      // TODO: let ts know this is a object
      // @ts-ignore
      return val[key];
    else if (
      this.config.priorityGetter &&
      typeof this.config.priorityGetter === 'function'
    )
      return this.config.priorityGetter(val);
    else if (typeof val === 'number')
      return val;
    else
      throw Error('Invalid Array ELement');
  }

  private swap(arr: T[], a: number, b: number) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    // Todo set null for generic type
    // @ts-ignore
    temp = null;
  }

  private parent(key: number): number {
    return Math.floor((key - 1) / 2);
  }

  private left(key: number): number {
    return 2 * key + 1;
  }

  private right(key: number): number {
    return 2 * key + 2;
  }

  queuingWithPriority(arr: T[]) {

  }

  queuingWithComparator(arr: T[]) {

  }


}

export {
  Queuer
}

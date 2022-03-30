declare interface Comparator<T> {
  (a: T, b: T): boolean;
}

declare interface QueuerConfig<T> {
  maxHeap: boolean,
  prioritized: boolean,
  key?: string,
  priorityGetter?: (a: T) => number,
  capacity?: number,
  comparator?: Comparator<T>;
}



export {
  QueuerConfig,
  Comparator
}

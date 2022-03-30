import { Comparator, QueuerConfig } from './types'

function defaultConfig<T>(): QueuerConfig<T> {
  return {
    comparator: (a, b) => a > b,
    maxHeap: true,
    prioritized: false,
    capacity: Infinity,
    key: "priority",
  }
}

class Queuer<T> {
  // Local variable
  config: QueuerConfig<T> = defaultConfig();
  heap: {
    key: number,
    val: T,
  }[] = [];
  size: number = 0;

  constructor(cfg: QueuerConfig<T>) {
    const config = Object.assign({}, defaultConfig(), cfg);

    if (!config.prioritized &&
        !config.comparator &&
        typeof config.comparator !== 'function'
    )
      throw Error("You must prioritize the element or give valid a comparator");

    if (config.prioritized &&
        config.key &&
        config.priorityGetter &&
        typeof config.priorityGetter !== 'function'
    )
      throw Error('You have to provide key or keyGetter');

    this.config = config;
  }

  heapify(arr: T[]) {
    this.size = arr.length;

    // Build heap
    for (let i = Math.floor(this.size / 2); i >= 0; i--) {
      this.recHeapify(arr, this.size, i);
    }

    // Sorting
    for (let i = this.size - 1; i > 0; i--) {
      this.swap(arr, 0, i);
      this.recHeapify(arr, i, 0);
    }
  }

  extract(arr: T[]): T {
    if (this.size <= 0) throw Error('This array has size 0');
    if (this.size === 1) return arr[0];

    const root = arr[0];
    arr[0] = <T>arr.pop();
    this.size -= 1;
    this.recHeapify(arr, this.size, 0);
    return root;
  }

  insert(arr: T[], item: T): boolean {
    // ? Whether to throw error if hit the capacity
    if (this.size === this.config.capacity)
      return false;

    // Get the index of last element
    let cur = this.size;
    let parent = this.parent(cur);
    arr.push(item);
    this.size += 1;

    // Fix the heap property
    while (cur != 0 &&
          this.compare(arr[cur], arr[parent])
    ){
      this.swap(arr, cur, parent);
      cur = parent;
    }

    return true;
  }

  getMin(arr: T[]): T {
    if (this.size <= 0) throw Error('This array has size 0');
    return arr[0]
  }

  getMax(arr: T[]): T {
    if (this.size <= 0) throw Error('This array has size 0');
    return arr[0]
  }

  queuing(arr: T[]) {
    return this.heapify(arr);
  }

  enqueue(arr: T[], item: T) {
    return this.insert(arr, item);
  }

  dequeue(arr: T[]) {
    return this.extract(arr);
  }

  /**
   * Private Function Below
   */

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

  private compare(lhs: T, rhs: T): boolean {
    // Compare using priority
    if (this.config.prioritized)
      // max heap or min heap
      return this.config.maxHeap
        ? this.getPriority(lhs) < this.getPriority(rhs)
        : this.getPriority(lhs) > this.getPriority(rhs)

    // Compare using comparator
    else if (typeof this.config.comparator === 'function')
      return this.config.comparator?.(lhs, rhs);

    else
      throw Error("Invalid Comparator or priority");
  }

  // iterative
  private iterHeapify(arr: T[]) {

  }

  // Recursive
  private recHeapify(arr: T[], size: number, root: number) {
    const left = this.left(root);
    const right = this.right(root);
    let top = root;

    if (left < size && this.compare(arr[left], arr[top]))
      top = left;

    if (right < size && this.compare(arr[right], arr[top]))
      top = right

    if (top !== root) {
      this.swap(arr, root, top);
      this.recHeapify(arr, size, top);
    }
  }





}

export {
  Queuer
}

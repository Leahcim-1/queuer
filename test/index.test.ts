import { Queuer } from '../src/index';

const randomInt = (num: number) => Math.floor(Math.random() * num);
const arrInt = Array(100).fill(100).map(randomInt);
const copy = <T>(a:T) => a;
const sortedDescArr = arrInt.map(copy).sort((a, b) => b - a);
const sortedAscArr = sortedDescArr.map(copy).reverse();


test('Max Heap with integer array', () => {
  const queuer = new Queuer({
    prioritized: true,
    maxHeap: true,
  })
  const testArr = arrInt.map(copy);
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedDescArr);
});

test('Min Heap with integer array', () => {
  const queuer = new Queuer({
    maxHeap: false,
  })
  const testArr = arrInt.map(copy);
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedAscArr);
});

test('Max Heap with default prioritized key', () => {
  const queuer = new Queuer({
    prioritized: true,
    maxHeap: true,
  })
  const testArr = arrInt.map(num => ({ priority: num }));
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedDescArr.map(num => ({ priority: num })));
});

test('Max Heap with comparator', () => {
  const queuer = new Queuer({
    comparator: (a: { priority: number},  b: { priority: number}) => a.priority < b.priority,
    maxHeap: true,
  })
  const testArr = arrInt.map(num => ({ priority: num }));
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedDescArr.map(num => ({ priority: num })));
});

test('Min Heap with comparator', () => {
  const queuer = new Queuer({
    comparator: (a: { priority: number},  b: { priority: number}) => a.priority > b.priority,
    maxHeap: true,
  })
  const testArr = arrInt.map(num => ({ priority: num }));
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedAscArr.map(num => ({ priority: num })));
});

import { Queuer } from '../src/index';

const randomInt = (num: number) => Math.floor(Math.random() * num);
const arrInt = Array(100).fill(100).map(randomInt);
const copy = <T>(a:T) => a;
const sortedDescArr = arrInt.map(copy).sort((a, b) => a - b);
const sortedAscArr = sortedDescArr.map(copy).reverse();
const arr_priority = arrInt.map(num => ({ priority: num }));
const arr_keyed = arrInt.map(num => ({ nonsense: num }));


test('Max Heap with prioritized', () => {
  const queuer = new Queuer({
    prioritized: true,
    maxHeap: true,
  })
  const testArr = arrInt.map(copy);
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedDescArr);
});

test('Min Heap with prioritized', () => {
  const queuer = new Queuer({
    prioritized: true,
    maxHeap: false,
  })
  const testArr = arrInt.map(copy);
  queuer.heapify(testArr);
  expect(testArr).toEqual(sortedAscArr);
});

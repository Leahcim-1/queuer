const arr = [{"val": 1}, {"val": 2}]

const swap = (arr, a, b) => {
  let t = arr[a]
  arr[a] = arr[b]
  arr[b] = t
  t = null;
}

swap(arr, 0, 1)

console.log(arr);

import { useState } from 'react';

export default function useArray<T>(defaultValue: T[]) {
  const [array, setArray] = useState(defaultValue);

  function push(element: T) {
    setArray((a) => [...a, element]);
  }

  function filter(callback: (elem: T) => boolean) {
    setArray((a) => a.filter(callback));
  }

  function update(index: number, newElement: T) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}

// Example:
// const { array, set, push, remove, filter, update, clear } = useArray([1, 2, 3, 4, 5, 6,])
// (1) push(7) | (2) update(1, 9) | (3) remove(1) | (4) filter((n) => n < 3) |  (5) set([1, 2]) | (6) clear

// 1: push number 7 to the end of array
// 2: update array value on index '1' to number 9
// 3: remove value on index '1'
// 4: filter all values and return all which more than 4
// 5: clear array and set new array with values '1' and '2';
// clear array

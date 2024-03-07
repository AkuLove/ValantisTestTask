import { useEffect } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce<T, U>(
  callback: () => T,
  delay: number,
  dependencies: U[]
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}

// Example:
// const [count, setCount] = useState(10)
// useDebounce(() => alert(count), 1000, [count])

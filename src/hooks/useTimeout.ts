import { useCallback, useEffect, useRef } from 'react';

export default function useTimeout<T>(callback: () => T, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

// Example:
// const [count, setCount] = useState(10)
// const { clear, reset } = useTimeout(() => setCount(0), 1000)

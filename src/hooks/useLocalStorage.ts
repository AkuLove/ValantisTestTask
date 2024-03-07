import { useState, useEffect } from 'react';

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorage<T>(initialValue: T, key: string): ReturnType<T> {
  const getValue = (): T => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;

// Example: const [value, setValue] = useLocalStorage('', 'name');

// Used as usual useState but with the 'key' on second parametr
// every time when our setValue works new updated value automatically sets in localStorage

import { useState } from 'react';

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(newValue?: boolean) {
    setValue((currentValue) =>
      typeof newValue === 'boolean' ? newValue : !currentValue
    );
  }

  return [value, toggleValue];
}

// Example const [value, toggleValue] = useToggle(false);

// Every time when you use toggleValue() value becomes the opposite
// if you pass any boolean value in toggleValue like toggleValue(true)
// this function always sets value to true

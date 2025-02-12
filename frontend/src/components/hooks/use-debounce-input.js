import { useEffect, useState } from "react";

export const useDebounceInput = (input, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(input);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [input]);

  return debouncedValue;
};
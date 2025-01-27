import { useEffect, useState } from "react";

export const useDebounceInput = (input) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(input);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [input]);

  return debouncedValue;
};

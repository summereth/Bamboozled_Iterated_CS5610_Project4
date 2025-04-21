import { useState, useEffect } from "react";

function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    return valueInLocalStorage ? JSON.parse(valueInLocalStorage) : initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageState;

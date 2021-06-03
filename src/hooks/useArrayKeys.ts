import { useState } from 'react';

const useArrayKeys = <T>() => {
  const [keys] = useState(new Map<T, string>());

  const generateKey = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const updateKey = (oldKey: T, newKey: T) => {
    if (keys.has(oldKey)) {
      keys.set(newKey, keys.get(oldKey) as string);
    }
  };

  const getKey = (item: T) => {
    if (keys.has(item)) {
      return keys.get(item);
    }
    const key = generateKey();
    keys.set(item, key);

    return key;
  };

  return { getKey, updateKey };
};

export default useArrayKeys;

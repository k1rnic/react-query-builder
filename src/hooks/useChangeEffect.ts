/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

type Destructor = () => void;

const useChangeEffect = (cb: EffectCallback, deps: DependencyList) => {
  const initialized = useRef(false);

  useEffect(() => {
    let destructor: Destructor | void;

    if (initialized.current) {
      destructor = cb();
    } else {
      initialized.current = true;
    }
    if (typeof destructor === 'function') {
      return destructor;
    }
  }, deps);
};

export default useChangeEffect;

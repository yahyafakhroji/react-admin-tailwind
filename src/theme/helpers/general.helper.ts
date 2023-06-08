import { useRef } from 'react';

export function chainedFunction(...funcs: any[]) {
  return funcs
    .filter((f) => f !== null && typeof f !== 'undefined')
    .reduce((acc, f) => {
      if (typeof f !== 'function') {
        throw new Error('Argument only accept functions, undefined, or null.');
      }

      if (acc === undefined) {
        return f;
      }

      return function chainedFunction(...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc.apply(this, args);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        f.apply(this, args);
      };
    }, undefined);
}

export function useUncertainRef(ref: any) {
  const newRef = useRef();

  if (ref) {
    return ref;
  }

  return newRef;
}

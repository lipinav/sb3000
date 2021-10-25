import React from 'react';

export function pickFromSynteticEvent<T extends HTMLElement>() {
  return <K extends keyof T>(key: K) =>
    <E extends ((t: T[K]) => void)>(fn: E) =>
      (e: React.SyntheticEvent<T>) => fn(e.currentTarget[key]);
}

import { createContext } from "react";

let visible = false;
const listeners = new Set<() => void>();

export const textVisibilityStore = {
  get: () => visible,
  set: (v: boolean) => {
    if (visible !== v) {
      visible = v;
      listeners.forEach((l) => l());
    }
  },
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};

export const TextVisibilityContext = createContext(textVisibilityStore);

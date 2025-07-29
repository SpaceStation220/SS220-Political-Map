let visible = false;
let version = 0;
const listeners = new Set<() => void>();

export const store = {
  get: () => visible,
  set: (v: boolean) => {
    if (visible !== v) {
      visible = v;
      listeners.forEach((l) => l());
    }
  },
  closeFloatingUI: () => {
    version++;
    listeners.forEach((l) => l());
  },
  getVersion: () => version,
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
};

export type Atom<T> = {
  get: () => T
  set: (value: T) => void
  subscribe: (cb: (nextState: T, prevState: T) => void) => () => void
}

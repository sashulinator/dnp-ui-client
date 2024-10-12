export type Controller<T> = {
  get: () => T
  set: (value: T) => void
  subscribe: (cb: (prevState: T, nextState: T) => void) => () => void
}

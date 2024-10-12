export type Controller<T> = {
  get: () => T
  set: (value: T) => void
  subscribe: (cb: (value: T) => void) => () => void
}

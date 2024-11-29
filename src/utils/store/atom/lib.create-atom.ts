import { type Atom } from './models'

export function createAtom<T>(init: T): Atom<T> {
  let state = init
  const listeners = new Set<(state: T, prevState: T) => void>()

  return {
    get: () => state,
    set: (newState: T) => {
      listeners.forEach((listener) => listener(newState, state))
      state = newState
    },
    subscribe: (cb: (state: T, prevState: T) => void) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
  }
}

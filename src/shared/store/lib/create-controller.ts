import { type Controller } from '../models/controller'

export function createController<T>(init: T): Controller<T> {
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

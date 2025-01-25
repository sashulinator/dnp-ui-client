import { useCallback, useMemo } from 'react'

import { type SetterOrUpdater } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'

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

export function useAtom<T>(init: T): Atom<T> {
  return useMemo(() => createAtom(init), [])
}

export function useAtomState<T>(init: T): [Atom<T>, T, SetterOrUpdater<T>] {
  const atom = useMemo(() => createAtom(init), [])

  useSubscribeUpdate(atom.subscribe)

  const setter = useCallback((newState: T | ((s: T) => T)) => {
    if (typeof newState === 'function') {
      atom.set((newState as (s: T) => T)(atom.get()))
    } else {
      atom.set(newState)
    }
  }, [])

  return [atom, atom.get(), setter]
}

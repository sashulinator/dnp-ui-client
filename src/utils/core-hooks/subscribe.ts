import { useEffect } from 'react'

import { type Update } from './force-update'

export type { Update }

/**
 * @example
 * useSubscribe(atom.subscribe, (..args) => {
 *   // do-smth
 * })
 */
export function useSubscribe<TArgs extends unknown[]>(
  subscribe: (cb: (...args: TArgs) => void) => () => void,
  cb: (...args: TArgs) => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const unsubscribes = subscribe(cb)
    return () => unsubscribes?.()
  }, deps)
}

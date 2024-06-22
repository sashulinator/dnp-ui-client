import { useEffect, useMemo } from 'react'

import { Update, useForceUpdate } from './force-update'

export type { Update }

/**
 * @example
 * useUpdate(subscribeToUpdates)
 *
 * function subscribeToUpdates(update: () => void, uns: ((() => void) | undefined)[]): void {
 *   uns.push(props.controller.on('selected', update))
 * }
 */
export function useUpdate(cb: (update: Update, unsubscribes: (() => void)[]) => void, deps: unknown[] = []) {
  const unsubscribes: (() => void)[] = useMemo(() => [], deps)
  const update = useForceUpdate()

  useEffect(() => {
    cb(update, unsubscribes)
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe())
    }
  }, deps)
}

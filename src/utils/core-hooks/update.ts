import { useEffect } from 'react'

import { type Update, useForceUpdate } from './force-update'

export type { Update }

/**
 * @example
 * useSubscribeUpdate(subscribes)
 *
 * function useSubscribeUpdate(update: () => void) {
 *   return[props.controller.subscribe(update)]
 * }
 */
export function useSubscribeUpdate(cb: (update: Update) => ((() => void) | undefined)[], deps: unknown[] = []) {
  const update = useForceUpdate()

  useEffect(() => {
    const unsubscribes = cb(update)
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe?.())
    }
  }, deps)
}

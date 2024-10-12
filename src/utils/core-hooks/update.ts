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
export function useSubscribeUpdate(
  cb: (update: Update) => ((() => void) | undefined)[] | undefined | (() => void),
  deps: unknown[] = [],
) {
  const update = useForceUpdate()

  useEffect(() => {
    const unsubscribes = cb(update)
    return () => {
      if (Array.isArray(unsubscribes)) {
        unsubscribes.forEach((unsubscribe) => unsubscribe?.())
      } else {
        unsubscribes?.()
      }
    }
  }, deps)
}

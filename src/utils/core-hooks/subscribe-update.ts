import { useEffect } from 'react'

import { type Update, useForceUpdate } from './force-update'

export type { Update }

/**
 * @example
 * const atom = useAtom(0)
 * useSubscribeUpdate(atom.subscribe)
 *
 * @example
 * const atom1 = useAtom(1)
 * const atom2 = useAtom(2)
 * useSubscribeUpdate((update) => {
 *  return [
 *    atom1.subscribe(update),
 *    atom2.subscribe(update),
 *  ]
 * })
 */
export function useSubscribeUpdate(
  cb?: ((update: Update) => ((() => void) | undefined)[] | undefined | (() => void)) | undefined,
  deps: unknown[] = [],
) {
  const update = useForceUpdate()

  useEffect(() => {
    const unsubscribes = cb?.(update)
    return () => {
      if (Array.isArray(unsubscribes)) {
        unsubscribes.forEach((unsubscribe) => unsubscribe?.())
      } else {
        unsubscribes?.()
      }
    }
  }, deps)
}

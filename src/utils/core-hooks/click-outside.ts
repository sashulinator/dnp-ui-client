import { RefObject, useLayoutEffect } from 'react'

import { useLatest } from './latest'

/**
 * Cледит за кликом за пределами элемента
 * @param ref
 * @param callback
 */
export function useOnClickOutside(ref: RefObject<Element>, handler: (e: MouseEvent | TouchEvent) => void) {
  const handlerRef = useLatest(handler)

  useLayoutEffect(() => {
    /** Подписка на клик за пределами */
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!ref.current || ref.current.contains(event?.target as Element)) {
        return
      }
      handlerRef.current(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

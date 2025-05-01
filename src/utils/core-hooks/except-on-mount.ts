import { useEffect, useRef } from 'react'

/**
 * Запускается всегда кроме первого рендеренга
 */
export function useExceptOnMount(cb: () => void | (() => void), dependecies: unknown[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const firstRender = useRef(true)

  useEffect(() => {
    if (!firstRender.current) return cb()
    firstRender.current = false
  }, dependecies)
}

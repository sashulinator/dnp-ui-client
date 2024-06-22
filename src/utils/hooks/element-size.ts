import { useCallback, useState } from 'react'

import { useEventListener } from './event-listener'
import { useIsomorphicLayoutEffect } from './isomorphic-layout-effect'

interface Size {
  width: number
  height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(el: T | null): Size {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: el?.offsetWidth || 0,
      height: el?.offsetHeight || 0,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el?.offsetHeight, el?.offsetWidth])

  useEventListener('resize', handleSize)

  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el?.offsetHeight, el?.offsetWidth])

  return size
}

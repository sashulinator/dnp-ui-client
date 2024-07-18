import { useEffect, useState } from 'react'

import { useForceUpdate } from '../core-hooks'
import { observeResize } from '../dom-event'
import { Size } from '../dom/types/size'

export function useMeasure(): [(ref: Element) => void, Size] {
  const [measureRef, setMeasureRef] = useState<Element | null>(null)
  const update = useForceUpdate()
  const styles = measureRef ? getComputedStyle(measureRef) : null

  const height = parseFloat(styles?.height || '') || 0
  const width = parseFloat(styles?.width || '') || 0

  useEffect(() => {
    if (!measureRef) return
    observeResize(measureRef, update)
  }, [measureRef])

  return [setMeasureRef, { height, width }]
}

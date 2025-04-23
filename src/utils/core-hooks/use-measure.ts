import React from 'react'

export function useMeasure() {
  const [dimensions, setDimensions] = React.useState<{
    width: null | number
    height: null | number
  }>({
    width: null,
    height: null,
  })

  const previousObserver = React.useRef<ResizeObserver | null>(null)

  const customRef = React.useCallback((node: HTMLElement | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect()
      previousObserver.current = null
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0]

          setDimensions({ width, height })
        }
      })

      observer.observe(node)
      previousObserver.current = observer
    }
  }, [])

  return [customRef, dimensions] as const
}

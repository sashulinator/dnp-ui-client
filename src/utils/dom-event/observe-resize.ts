export function observeResize(element: Element, callback: (entry: ResizeObserverEntry) => void) {
  let prevWidth: number | null = null
  let prevHeight: number | null = null

  function onResize([entry]: ResizeObserverEntry[]) {
    if (!document.documentElement.contains(entry.target)) return
    const { width, height } = entry.target.getBoundingClientRect()
    const fixedWidth = Math.floor(width)
    const fixedHeight = Math.floor(height)

    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      // https://webkit.org/blog/9997/resizeobserver-in-webkit/
      Promise.resolve().then(() => callback(entry))
    }

    prevWidth = fixedWidth
    prevHeight = fixedHeight
  }

  const resizeObserver = new ResizeObserver(onResize)

  resizeObserver.observe(element)

  return () => {
    resizeObserver.disconnect()
  }
}

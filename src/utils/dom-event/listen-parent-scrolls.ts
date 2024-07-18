import { getWindow } from '../dom/get-window'

export function listenParentScrolls(
  target: HTMLElement | null,
  onScroll: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
) {
  if (target === null) {
    return
  }

  const scrollerList = new Set([getWindow(target), ...collectScrollableParents(target)])

  scrollerList.forEach((scroller) => {
    scroller.addEventListener('scroll', onScroll, options)
  })

  return () => {
    scrollerList.forEach((scroller) => {
      scroller.removeEventListener('scroll', onScroll, options)
    })
  }
}

// Private

export function collectScrollableParents(ele: HTMLElement) {
  const scrollerList: HTMLElement[] = []
  let current = ele?.parentElement

  const scrollStyle = ['hidden', 'scroll', 'auto']

  while (current) {
    const { overflowX, overflowY } = getWindow(current).getComputedStyle(current)
    if (scrollStyle.includes(overflowX) || scrollStyle.includes(overflowY)) {
      scrollerList.push(current)
    }

    current = current.parentElement
  }

  return scrollerList
}

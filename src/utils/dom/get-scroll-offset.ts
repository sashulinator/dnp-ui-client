import { getWindow } from './get-window'
import { Offset } from './types/offset'

export function getScrollOffset(element: Element): Offset {
  const window = getWindow(element)
  const elementRect = element.getBoundingClientRect()

  const left = window.scrollX + elementRect.left
  const top = window.scrollY + elementRect.top

  return { left, top }
}

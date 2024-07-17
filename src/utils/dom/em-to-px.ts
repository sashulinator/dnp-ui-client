import { assertNotNull } from '../core'
import { toPx } from './to-px'

export function emToPx(em: number, element: Element): number {
  assertNotNull(element.parentElement)
  return em * toPx(getComputedStyle(element.parentElement).fontSize, element)
}

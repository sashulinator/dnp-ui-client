import { capitalize } from '../core'
import { toPx } from './to-px'
import { Side } from './types/side'

export function getMargin(element: Element): Record<Side, number> {
  const sides: Side[] = ['top', 'right', 'bottom', 'left']

  const ret: Record<Side, number> = { left: 0, right: 0, top: 0, bottom: 0 }

  for (let index = 0; index < sides.length; index++) {
    const side = sides[index]
    const value = getComputedStyle(element)[`margin${capitalize(side)}`]
    ret[side] = toPx(value, element)
  }

  return ret
}

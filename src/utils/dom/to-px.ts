import { emToPx } from './em-to-px'
import { remToPx } from './rem-to-px'

export function toPx(str: string, element: Element): number {
  if (str.endsWith('px')) return parseFloat(str)
  if (str.endsWith('rem')) return remToPx(parseFloat(str), element)
  if (str.endsWith('em')) return emToPx(parseFloat(str), element)
  return parseFloat(str)
}

export function remToPx(rem: number, el: Element): number {
  return rem * parseFloat(getComputedStyle(el.ownerDocument.documentElement).fontSize)
}

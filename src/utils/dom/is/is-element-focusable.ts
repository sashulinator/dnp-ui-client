export function isElementFocusable(element: HTMLElement): boolean {
  return !element.ariaDisabled && !element.hidden && !element.ariaHidden
}

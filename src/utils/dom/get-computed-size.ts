import { getBorder } from './get-border'
import { getMargin } from './get-margin'
import { getPadding } from './get-padding'
import { toPx } from './to-px'
import { Size } from './types/size'

/**
 * This function, unlike getBoundaryClient,
 * returns the size of the component as it would be at scale === 1.
 */
export function getComputedSize(
  element: Element,
  requestedBoxSizing: 'border-box' | 'content-box' = 'border-box'
): Size {
  const styles = getComputedStyle(element)
  const elementBoxSizing = styles.boxSizing

  const width = toPx(styles.width, element)
  const height = toPx(styles.height, element)

  if (requestedBoxSizing === elementBoxSizing) {
    return { width, height }
  }

  if (requestedBoxSizing === 'content-box' && elementBoxSizing === 'border-box') {
    const border = getBorder(element)
    const padding = getPadding(element)
    return {
      width: width - border.left - border.right - padding.left - padding.right,
      height: height - border.top - border.bottom - padding.top - padding.bottom,
    }
  }

  const margin = getMargin(element)
  // requestedBoxSizing === 'border-box' && elementBoxSizing === 'content-box'
  return {
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom,
  }
}

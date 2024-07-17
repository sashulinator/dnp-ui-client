export function getWindow(element: Element): Window {
  const window = element.ownerDocument.defaultView

  if (!window) {
    throw new Error('Cannot get Window')
  }

  return element.ownerDocument.defaultView
}

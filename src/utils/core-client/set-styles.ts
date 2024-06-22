type Element = { style: CSSStyleDeclaration }

export function setStyles(element: Element, styles: Record<string, string>): void {
  const entries = Object.entries(styles)

  for (let index = 0; index < entries.length; index++) {
    const [key, value] = entries[index]
    // @ts-ignore
    element.style[key] = value
  }
}

export function isHTMLElement(input: unknown): input is HTMLElement {
  return (input as any)?.nodeType === 1
}

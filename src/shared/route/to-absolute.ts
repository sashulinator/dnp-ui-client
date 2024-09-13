export function toAbsolute(path: string): string {
  return `${location.origin}${path}`
}

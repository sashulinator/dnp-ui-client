export function last<T>(list?: T[]): T {
  const item = list?.[list.length - 1]
  return item as T
}

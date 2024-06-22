export function push<T>(item: T, list: T[]): T[] {
  const clone = [...list]
  clone.push(item)
  return clone
}

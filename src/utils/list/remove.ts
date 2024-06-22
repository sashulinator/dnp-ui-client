export function remove<T>(index: number, list: T[]): T[] {
  const clone = [...list]
  clone.splice(index, 1)
  return clone
}

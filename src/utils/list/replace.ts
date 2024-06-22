export function replace<T>(list: T[], index: number, value: T): T[] {
  const clone = [...list]
  clone[index] = value
  return clone
}

export function get<T>(index: number, list?: T[]): T {
  const item = list?.[index]

  if (item === undefined) {
    throw new Error(`List Error: Cannot find index=${index}`)
  }

  return item
}

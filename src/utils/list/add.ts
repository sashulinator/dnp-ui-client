import { validateIndex } from './_private/validate-index'

export function add<T>(index: number, item: T, list: T[]): T[] {
  validateIndex(index, list)
  const clone = [...list]
  clone.splice(index, 0, item)
  return clone
}

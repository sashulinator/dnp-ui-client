import { type Dictionary, curry } from '~dnp/utils/core'

export function _serializeItem<T extends string, TItem extends Dictionary>(
  type: T,
  data: TItem,
): { type: T; data: TItem } {
  return { type, data }
}

export const serializeItem = curry(_serializeItem)

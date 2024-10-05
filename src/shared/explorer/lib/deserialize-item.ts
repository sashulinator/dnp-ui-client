import { type Item } from '../models/explorer'

export function deserializeItem<T extends Item>(item: Item): T['data'] {
  return item.data
}

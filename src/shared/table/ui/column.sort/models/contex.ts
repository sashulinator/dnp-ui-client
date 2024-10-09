import { type Dictionary } from '~/utils/core'

import { type ToSort } from './sort'

export type Context<TItem extends Dictionary> = {
  sort: ToSort<TItem> | undefined
  setSort: (val: ToSort<TItem> | undefined) => void
}

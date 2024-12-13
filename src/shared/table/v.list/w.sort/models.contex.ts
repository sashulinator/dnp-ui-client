import { type Dictionary } from '~/utils/core'
import { type Atom } from '~/utils/store'

import { type ToSort } from './models.sort'

export type Context<TItem extends Dictionary> = {
  sortController: Atom<ToSort<TItem> | undefined>
}

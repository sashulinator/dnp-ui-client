import { type Controller } from '~/shared/store'
import { type Dictionary } from '~/utils/core'

import { type ToSort } from './sort'

export type Context<TItem extends Dictionary> = {
  sortController: Controller<ToSort<TItem> | undefined>
}

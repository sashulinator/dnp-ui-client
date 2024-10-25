import { type Controller } from '~dnp/shared/store'
import { type Dictionary } from '~dnp/utils/core'

import { type ToSort } from './sort'

export type Context<TItem extends Dictionary> = {
  sortController: Controller<ToSort<TItem> | undefined>
}

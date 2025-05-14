import { type ReplaceValueByFilter } from '~/slices/where'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'

import type { Column as TableListColumn } from '../types'

export * from '~/common/slices/database-client/models'

export type Column<TItem extends Dictionary, TContext extends Dictionary> = TableListColumn<TItem, TContext>

export type Context<TItem extends Dictionary> = {
  searchFilter: ReplaceValueByFilter<TItem> | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof TItem, ReplaceValueByFilter<TItem> | undefined>>
}

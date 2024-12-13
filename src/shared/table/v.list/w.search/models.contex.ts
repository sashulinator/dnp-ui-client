import { type ReplaceValueByFilter } from '~/slices/where'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'

export type Context<TItem extends Dictionary> = {
  searchFilter: ReplaceValueByFilter<TItem> | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof TItem, ReplaceValueByFilter<TItem> | undefined>>
}

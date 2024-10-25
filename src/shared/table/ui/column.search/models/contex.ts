import { type ReplaceValueByFilter } from '~dnp/shared/where'
import { type Dictionary, type SetterOrUpdater } from '~dnp/utils/core'

export type Context<TItem extends Dictionary> = {
  searchFilter: ReplaceValueByFilter<TItem> | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof TItem, ReplaceValueByFilter<TItem> | undefined>>
}

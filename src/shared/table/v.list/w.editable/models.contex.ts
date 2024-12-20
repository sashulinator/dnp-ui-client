import { type Dictionary } from '~/utils/core'
import { type Atom } from '~/utils/store'

export type Context<TItem extends Dictionary> = {
  columnNameAtoms: Record<keyof TItem, Atom<string>>
  removeColumn: (columnName: keyof TItem) => void
}

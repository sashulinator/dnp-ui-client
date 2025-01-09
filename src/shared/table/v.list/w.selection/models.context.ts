import { type Dictionary } from '~/utils/core'
import { type Atom } from '~/utils/store'

export type Context<TItem extends Dictionary> = {
  idKey: string
  selectedItemsAtom: Atom<Dictionary<TItem>>
}

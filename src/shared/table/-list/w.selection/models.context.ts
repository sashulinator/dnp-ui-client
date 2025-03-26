import { type Dictionary } from '~/utils/core'
import { type Atom } from '~/utils/store'

export type Context<TItem extends Dictionary> = {
  idKey: string
  setter?: (item: TItem, state: Dictionary<TItem>) => Dictionary<TItem>
  getter?: (item: TItem, state: Dictionary<TItem>) => TItem
  selectedItemsAtom: Atom<Dictionary<TItem>>
}

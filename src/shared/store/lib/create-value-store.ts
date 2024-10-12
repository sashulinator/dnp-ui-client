import { type Store, create } from './use-create-store'

export type ValueStoreState = {
  value: boolean
  setValue: (value: boolean) => void
}

export function createValueStore(init = false): Store<ValueStoreState> {
  return create<ValueStoreState>((set) => ({
    value: init,
    setValue: (value: boolean) => set({ value }),
  }))
}

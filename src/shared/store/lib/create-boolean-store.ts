import { type Store, create } from './use-create-store'

export type BooleanStoreState = {
  value: boolean
  setValue: (value: boolean) => void
  setTrue: () => void
  setFalse: () => void
}

export function createBooleanStore(init = false): Store<BooleanStoreState> {
  return create<BooleanStoreState>((set) => ({
    value: init,
    setValue: (value: boolean) => set({ value }),
    setTrue: () => set({ value: true }),
    setFalse: () => set({ value: false }),
  }))
}

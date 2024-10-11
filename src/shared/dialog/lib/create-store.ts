import { type Store, createStore } from '~/shared/store'

export type DialogStoreValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export function createDialogStore(init = false): Store<DialogStoreValue> {
  return createStore<DialogStoreValue>((set) => ({
    isOpen: init,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }))
}

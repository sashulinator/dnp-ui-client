import { type StoreApi, type UseBoundStore, createStore } from '~/shared/store'

export type DialogStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export type UseDialogBoundStore = UseBoundStore<StoreApi<DialogStore>>

export function createDialogStore(init = false): UseDialogBoundStore {
  return createStore<DialogStore>((set) => ({
    isOpen: init,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }))
}

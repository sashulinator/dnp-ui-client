import { type NotificationToastProps } from '~/shared/toast'
import { type Id, generateId } from '~/utils/core'
import { createStore } from '~/utils/store'

const LIMIT = 3

export type NotificationToastPropsWithId = NotificationToastProps & { id: Id }

export type State = {
  list: NotificationToastPropsWithId[]
  add: (item: NotificationToastPropsWithId) => void
  remove: (id: Id) => void
  patch: (item: Partial<NotificationToastProps> & { id: Id }) => void
}

export const useNotificationListStore = createStore<State>((set) => ({
  list: [],
  add: (item: NotificationToastPropsWithId) =>
    set((state) => {
      const closedList = state.list.map((item, i) => ({ ...item, open: state.list.length - i < LIMIT }))
      return { list: [...closedList, item] }
    }),
  remove: (id: Id) =>
    set((state) => {
      const filtered = state.list.filter((item) => item.id !== id)
      return { list: filtered }
    }),
  patch: (item: Partial<NotificationToastProps> & { id: Id }) =>
    set((state) => {
      const index = state.list.findIndex((i) => i.id === item.id)
      const listItem = state.list[index]
      state.list[index] = { ...listItem, ...item }
      return { list: state.list }
    }),
}))

export function notify(item: NotificationToastProps & { id?: Id | undefined }) {
  useNotificationListStore.getState().add({ ...item, id: item.id || generateId() })
}

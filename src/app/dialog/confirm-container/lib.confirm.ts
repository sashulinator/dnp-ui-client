import type { ConfirmDialog } from '~/shared/dialog'
import { emptyFn } from '~/utils/function'
import { createAtom } from '~/utils/store'

const defaultState = {
  open: false,
  title: '',
  description: '',
  onClose: emptyFn,
  onConfirm: emptyFn,
}

export const state = createAtom<ConfirmDialog.ConfirmProps>(defaultState)

export function confirm(props: Omit<ConfirmDialog.ConfirmProps, 'open'>) {
  state.set({
    ...props,
    open: true,
    onClose: () => {
      props.onClose?.()
      state.set(defaultState)
    },
    onConfirm: async () => {
      await props.onConfirm()
      state.set(defaultState)
    },
  })
}

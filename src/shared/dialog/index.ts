/**
 * ui
 */
import { default as Dialog } from './ui/dialog'

export default Dialog
export { type DialogType } from './ui/dialog'

export { default as ErrorDialog, type ErrorProps as ErrorDialogProps } from './ui/error'
export { default as SuccessDialog, type SuccessProps as SuccessDialogProps } from './ui/success'
export { default as ConfirmDialog } from './ui/confirm'
export type * as ConfirmDialogTypes from './ui/confirm'

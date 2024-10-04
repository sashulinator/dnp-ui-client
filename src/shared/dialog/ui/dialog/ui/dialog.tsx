/**
 * ui
 */
import { Dialog } from '@radix-ui/themes'

const Root = Dialog.Root
const Content = Dialog.Content
const Title = Dialog.Title
const Trigger = Dialog.Trigger
const Description = Dialog.Description
const Close = Dialog.Close

export { Root, Content, Title, Trigger, Description, Close }

/**
 * props
 */

export type {
  RootProps,
  ContentProps,
  TitleProps,
  TriggerProps,
  DescriptionProps,
  CloseProps,
} from '@radix-ui/themes/dist/esm/components/dialog.d.ts'

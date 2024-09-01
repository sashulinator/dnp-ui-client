/**
 * ui
 */
import { TextField as UiTextField } from '@radix-ui/themes'

import { default as Root } from './ui/text-field'

export { type Props as RootProps } from './ui/text-field'

export type { SlotProps } from '@radix-ui/themes/dist/esm/components/text-field.d.ts'

const TextField = {
  Root,
  Slot: UiTextField.Slot,
}

export default TextField

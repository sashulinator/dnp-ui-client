/**
 * ui
 */
import { default as Select } from './ui/select'

export default Select
export type { SelectProps } from './ui/select'

export * as InputSelect from './v.input'
export * as LabeledSelect from './v.labeled'

export type Option = {
  value: string
  display: string
}

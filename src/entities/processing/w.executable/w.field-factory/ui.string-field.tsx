import TextInput, { type TextInputProps } from '~/shared/text-input'
import { c } from '~/utils/core'

import { SLICE } from '../constants'

export const NAME = `${SLICE}-w-StringField`

export default function Component(
  props: Omit<TextInputProps, 'input' | 'meta' | 'onChange'> & {
    _paramContext: unknown
    onChange: (value: string) => void
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _paramContext, onChange, ...textFieldProps } = props

  return (
    <TextInput
      {...textFieldProps}
      className={c(NAME)}
      onChange={(e) => {
        onChange?.(e.target.value)
      }}
    />
  )
}

Component.displayName = NAME

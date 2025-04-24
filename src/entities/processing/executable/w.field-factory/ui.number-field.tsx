import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import TextInput, { type TextInputProps } from '~/shared/text-input'
import { c } from '~/utils/core'

import { SLICE } from '../constants'
import { type ParamFactoryContext } from './models'

export const NAME = `${SLICE}-w-StringField`

export default function Component(
  props: Omit<TextInputProps, 'input' | 'meta' | 'onChange'> & {
    _paramContext: ParamFactoryContext
    onChange: (value: number) => void
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _paramContext, onChange, ...textFieldProps } = props

  return (
    <Flex direction='column'>
      <Labeled label={_paramContext.paramSchema.display}>
        <TextInput
          {...textFieldProps}
          className={c(NAME)}
          type='number'
          onChange={(e) => {
            onChange?.(parseFloat(e.target.value))
          }}
        />
      </Labeled>
    </Flex>
  )
}

Component.displayName = NAME

import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import { InputSelect } from '~/shared/select'
import { c } from '~/utils/core'

import { SLICE } from '../constants'
import { type ParamFactoryContext } from './models'

export const NAME = `${SLICE}-w-StringField`

export default function Component(
  props: Omit<InputSelect.InputProps, 'input' | 'meta' | 'onChange'> & {
    _paramContext: ParamFactoryContext
    onChange: (value: string) => void
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _paramContext, onChange, ...textFieldProps } = props

  return (
    <Flex direction='column'>
      <Labeled label={_paramContext.paramSchema.display}>
        <InputSelect.default
          {...textFieldProps}
          className={c(NAME)}
          onChange={(e) => {
            onChange?.(e.toString())
          }}
        />
      </Labeled>
    </Flex>
  )
}

Component.displayName = NAME

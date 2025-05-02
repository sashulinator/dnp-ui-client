import { memo } from 'react'

import Flex from '~/shared/flex'
import { type FieldInputProps, useField } from '~/shared/form'
import Labeled from '~/shared/labeled'
import TextInput, { type TextInputProps } from '~/shared/text-input'
import { fns } from '~/utils/core'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'
import { syncFieldStatesBinding } from './lib.sync-field-states-binding'

// eslint-disable-next-line react-refresh/only-export-components
export const bindings = [syncFieldStatesBinding]

export type Props = ComponentProps<
  TextInputProps & {
    fieldName: string
    input: FieldInputProps<string>
    label?: string | undefined
  }
>

const NAME = 'dnp-layoutSchema-textField'

function Component(props: Props): React.ReactNode {
  const [{ label, fieldName = 'unknown', onValueChange = defaultOnValueChange, ...restProps }] = splitProps(props)

  const { input } = useField(fieldName)

  return (
    <Flex direction='column' position='relative' width='100%'>
      <Labeled label={label}>
        <TextInput
          {...restProps}
          type='text'
          style={{
            width: '100%',
            ...restProps.style,
          }}
          value={input.value}
          onValueChange={onValueChange}
          onBlur={fns(restProps.onBlur, input.onBlur)}
          onFocus={fns(restProps.onFocus, input.onFocus)}
        />
      </Labeled>
    </Flex>
  )

  // Private

  function defaultOnValueChange(value: string | undefined) {
    props.setProps({ value })
  }
}

const TextField = memo(Component)
TextField.displayName = NAME
export default TextField

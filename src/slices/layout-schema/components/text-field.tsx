import { memo } from 'react'

import Flex from '~/shared/flex'
import { type FieldInputProps, useField } from '~/shared/form'
import Labeled from '~/shared/labeled'
import TextInput, { type TextInputProps } from '~/shared/text-input'
import { c, fns } from '~/utils/core'

import { type ComponentProps } from '../types'
import { syncFieldStatesBinding } from './lib.sync-field-states-binding'

export type Props = ComponentProps<
  TextInputProps & {
    fieldName: string
    input: FieldInputProps<string>
    label?: string | undefined
  }
>

// eslint-disable-next-line react-refresh/only-export-components
export const bindings = [syncFieldStatesBinding]

const NAME = 'dnp-layoutSchema-textInputField'

function Component(props: Props): React.ReactNode {
  const {
    children,
    context,
    block,
    propsState,
    className,
    label,
    value,
    fieldName = 'unknown',
    onValueChange = defaultOnValueChange,
    setProps,
    ...restProps
  } = props

  const { input } = useField(fieldName)

  return (
    <Flex direction='column' position='relative' width='100%'>
      <Labeled label={label}>
        <TextInput
          {...restProps}
          style={{
            width: '100%',
            ...restProps.style,
          }}
          type='text'
          onBlur={fns(restProps.onBlur, input.onBlur)}
          onFocus={fns(restProps.onFocus, input.onFocus)}
          value={value}
          className={c(className)}
          onValueChange={onValueChange}
        />
      </Labeled>
    </Flex>
  )

  // Private

  function defaultOnValueChange(value: string | undefined) {
    setProps({ value })
  }
}

const TextField = memo(Component)
TextField.displayName = NAME
export default TextField

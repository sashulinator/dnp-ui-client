import { memo } from 'react'

import Flex from '~/shared/flex'
import { type FieldInputProps, useField } from '~/shared/form'
import Labeled from '~/shared/labeled'
import { SelectInput } from '~/shared/select'
import { fns } from '~/utils/core'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'
import { savePropToLocalStorage } from './lib.save-prop-to-local-storage'
import { syncFieldStatesBinding } from './lib.sync-field-states-binding'

// eslint-disable-next-line react-refresh/only-export-components
export const bindings = [syncFieldStatesBinding, savePropToLocalStorage]

export type Props = ComponentProps<
  SelectInput.InputProps & {
    fieldName: string
    input: FieldInputProps<string>
    label?: string | undefined
    format: (v: string) => string
    parse: (v: string) => string
  }
>

const NAME = 'dnp-layoutSchema-selectField'

function Component(props: Props): React.ReactNode {
  const [{ label, value, fieldName = 'unknown', onValueChange = defaultOnValueChange, ...restProps }] =
    splitProps(props)

  const { input } = useField(fieldName)

  return (
    <Flex direction='column' position='relative' width='100%'>
      <Labeled label={label}>
        <SelectInput.default
          {...restProps}
          style={{
            width: '100%',
            ...restProps.style,
          }}
          value={value}
          onValueChange={fns(onValueChange, input.onChange)}
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

const SelectField = memo(Component)
SelectField.displayName = NAME
export default SelectField

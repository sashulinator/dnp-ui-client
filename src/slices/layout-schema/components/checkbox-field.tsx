import { memo } from 'react'

import UiCheckbox, { type CheckboxProps } from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { useField } from '~/shared/form'
import Labeled from '~/shared/labeled'
import { fns } from '~/utils/core'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'
import { savePropToLocalStorage } from './lib.save-prop-to-local-storage'
import { syncFieldStatesBinding } from './lib.sync-field-states-binding'

export const bindings = [syncFieldStatesBinding, savePropToLocalStorage]

export type Props = ComponentProps<
  Omit<CheckboxProps, 'value'> & {
    fieldName: string
    label?: string | undefined
    onValueChange?: ((value: boolean) => void) | undefined
    value?: boolean | undefined
  }
>

const NAME = 'dnp-layoutSchema-checkboxField'

function Component(props: Props): React.ReactNode {
  const [{ label, value, checked, onValueChange = defaultOnValueChange, fieldName, ...restProps }] = splitProps(props)

  const { input } = useField(fieldName)

  return (
    <Flex position='relative' width='fit-content' gap='2' direction='row-reverse'>
      <Labeled label={label}>
        <UiCheckbox
          {...restProps}
          onCheckedChange={onValueChange}
          onBlur={fns(restProps.onBlur, input.onBlur)}
          onFocus={fns(restProps.onFocus, input.onFocus)}
          checked={checked || value || false}
        />
      </Labeled>
    </Flex>
  )

  function defaultOnValueChange(value: boolean) {
    props.setProps({ value })
  }
}

const Checkbox = memo(Component)
Checkbox.displayName = NAME
export default Checkbox

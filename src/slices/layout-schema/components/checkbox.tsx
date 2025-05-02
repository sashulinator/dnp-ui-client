import { memo } from 'react'

import UiCheckbox, { type CheckboxProps } from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'

export type Props = ComponentProps<
  Omit<CheckboxProps, 'value'> & {
    label?: string | undefined
    onValueChange?: ((value: boolean) => void) | undefined
    value?: boolean | undefined
  }
>

const NAME = 'dnp-layoutSchema-checkbox'

function Component(props: Props): React.ReactNode {
  const [{ label, value, checked, onValueChange = defaultOnValueChange, ...restProps }] = splitProps(props)

  return (
    <Flex position='relative' width='fit-content' gap='2' direction='row-reverse'>
      <Labeled label={label}>
        <UiCheckbox {...restProps} onCheckedChange={onValueChange} checked={checked || value || false} />
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

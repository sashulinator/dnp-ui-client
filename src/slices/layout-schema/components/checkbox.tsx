import { memo } from 'react'

import Checkbox, { type CheckboxProps } from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import { c, fns } from '~/utils/core'

import { type ComponentProps } from '../types'

export type Props = ComponentProps<
  Omit<CheckboxProps, 'value'> & {
    label?: string | undefined
    onValueChange?: ((value: boolean) => void) | undefined
    value?: boolean | undefined
  }
>

const NAME = 'dnp-layoutSchema-checkbox'

const TextInputField = memo((props: Props): React.ReactNode => {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, checked, label, value, content, context, onValueChange = defaultOnValueChange, onCheckedChange, block, setProps, blockComponent, ...restProps } = props

  return (
    <Flex position='relative' width='fit-content' gap='2' direction='row-reverse'>
      <Labeled label={label}>
        <Checkbox
          {...restProps}
          onCheckedChange={fns(onCheckedChange, onValueChange)}
          checked={checked || value || false}
          className={c(className)}
        />
      </Labeled>
    </Flex>
  )

  function defaultOnValueChange(value: boolean) {
    setProps({ value })
  }
})
export default TextInputField

TextInputField.displayName = NAME

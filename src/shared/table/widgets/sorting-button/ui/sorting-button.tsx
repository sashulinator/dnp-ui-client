import { type ForwardedRef, forwardRef } from 'react'

import Button, { type ButtonProps } from '~/shared/button'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { c, fns } from '~/utils/core'
import { setRefs } from '~/utils/react'

export type Value = 'asc' | 'desc' | undefined

export interface Props extends Omit<ButtonProps, 'onChange'> {
  className?: string | undefined
  value: Value
  onChange?: ((value: Value) => void) | undefined
}

export const NAME = 'ui-Table-w-SortingButton'

const nextValue = {
  asc: 'desc',
  desc: undefined,
  undefined: 'asc',
} as const

/**
 * ui-Table-w-SortingButton
 */
function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { value, onChange, ...buttonProps } = props

  return (
    <Tooltip
      content={
        nextValue[String(value) as 'desc'] === undefined ? (
          <Text>Клик чтобы отменить сортировку</Text>
        ) : (
          <Text>
            Клик чтобы сортировать
            <br />
            по {nextValue[String(value) as 'asc'] === 'desc' ? 'убыванию' : 'возростанию'}
          </Text>
        )
      }
    >
      <Button
        {...buttonProps}
        ref={setRefs(ref)}
        color={value ? 'amber' : 'gray'}
        className={c(props.className, NAME)}
        onClick={fns(props.onClick, () => onChange?.(nextValue[String(value) as 'asc']))}
      >
        <Icon name={value === 'asc' ? 'ChevronDown' : value === 'desc' ? 'ChevronUp' : 'ChevronDown'} />
      </Button>
    </Tooltip>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

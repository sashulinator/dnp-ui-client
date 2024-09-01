import Button, { ButtonProps } from '~/ui/button'
import Icon from '~/ui/icon'
import { c, fns } from '~/utils/core'

export type Value = 'asc' | 'desc' | undefined

export interface Props extends Omit<ButtonProps, 'onChange'> {
  className?: string | undefined
  value: Value
  onChange?: ((value: Value) => void) | undefined
}

export const NAME = 'ui-Table-w-SortingButton'

/**
 * ui-Table-w-SortingButton
 */
export default function Component(props: Props): JSX.Element {
  const { value, onChange, ...buttonProps } = props

  return (
    <Button
      {...buttonProps}
      color={value ? 'amber' : 'gray'}
      className={c(props.className, NAME)}
      onClick={fns(props.onClick, () => onChange?.(value === 'desc' ? 'asc' : value === 'asc' ? undefined : 'desc'))}
    >
      <Icon name={value === 'asc' ? 'ChevronDown' : value === 'desc' ? 'ChevronUp' : 'ChevronDown'} />
    </Button>
  )
}

Component.displayName = NAME

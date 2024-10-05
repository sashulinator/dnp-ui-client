import { c, fns } from '~/utils/core'
import { useBoolean } from '~/utils/core-hooks'

import Button, { type ButtonProps } from '../../button'

export type Props = ButtonProps

Component.displayName = 'button-Danger'

export default function Component(props: Props): JSX.Element {
  const { variant, color, ...buttonProps } = props
  const [isDanger, setDanger, unsetDanger] = useBoolean(false)

  return (
    <Button
      {...buttonProps}
      variant={isDanger ? 'solid' : (variant as 'solid')}
      color={isDanger ? 'red' : (color as 'red')}
      className={c(props.className, Component.displayName)}
      onMouseEnter={fns(props.onMouseEnter, setDanger)}
      onMouseLeave={fns(props.onMouseLeave, unsetDanger)}
      onFocus={fns(props.onFocus, setDanger)}
      onBlur={fns(props.onBlur, unsetDanger)}
    />
  )
}

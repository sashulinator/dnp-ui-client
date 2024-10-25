import { c, fns } from '~dnp/utils/core'
import { useBoolean } from '~dnp/utils/core-hooks'

import Button, { type ButtonProps } from '../../button'

export type Props = ButtonProps

const NAME = 'button-Danger'

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

Component.displayName = NAME

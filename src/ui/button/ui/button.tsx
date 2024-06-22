import { Button, ButtonProps } from '@radix-ui/themes'
import './button.scss'
import { c } from '~/utils/core'

export interface Props extends ButtonProps {
  round?: boolean
  square?: boolean
}

const displayName = 'ui-Button'

/**
 * ui-Button
 */
export default function Component(props: Props): JSX.Element {
  const { round, square, ...buttonProps } = props

  return (
    <Button {...buttonProps} className={c(props.className, displayName, round && '--round', square && '--square')} />
  )
}
Component.displayName = displayName

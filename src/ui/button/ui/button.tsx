import { Button, ButtonProps } from '@radix-ui/themes'
import { ForwardedRef, forwardRef } from 'react'
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
export function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { round, square, ...buttonProps } = props

  return (
    <Button
      {...buttonProps}
      ref={ref}
      className={c(props.className, displayName, round && '--round', square && '--square')}
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef

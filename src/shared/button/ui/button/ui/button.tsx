import './button.scss'

import type { ButtonProps } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'

import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import { c } from '~/utils/core'

export interface Props extends Omit<ButtonProps, 'variant'> {
  round?: boolean
  square?: boolean
  variant?: ButtonProps['variant'] | undefined
}

const NAME = 'dnp-button-Button'

export function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { round, square, variant = 'solid', ...buttonProps } = props

  return (
    <Button
      {...buttonProps}
      variant={variant}
      ref={ref}
      className={c(props.className, NAME, round && '--round', square && '--square')}
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

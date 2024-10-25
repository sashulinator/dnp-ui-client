import './button.scss'

import type { ButtonProps } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'

import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import { c } from '~dnp/utils/core'

export interface Props extends ButtonProps {
  round?: boolean
  square?: boolean
}

const NAME = 'button-Button'

export function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { round, square, ...buttonProps } = props

  return (
    <Button {...buttonProps} ref={ref} className={c(props.className, NAME, round && '--round', square && '--square')} />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

import './ui.base.scss'

import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import type { ButtonProps } from '~/shared/button'
import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

export type Props = Omit<ButtonProps, 'variant' | 'size'> & {
  variant?: 'soft' | 'outline' | undefined
  size?: '1' | '2' | '3' | '4' | null | undefined
}

const NAME = 'ui-input-base'

export function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { variant = 'outline', size = '2', ...buttonProps } = props

  return (
    <button
      {...buttonProps}
      ref={setRefs(ref)}
      data-disabled={props.disabled === true ? props.disabled : undefined}
      className={c(props.className, NAME, 'rt-reset', `--variant--${variant}`, size && `--size--${size}`)}
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

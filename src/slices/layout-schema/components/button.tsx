import { memo } from 'react'

import UiButton, { type ButtonProps as UiButtonProps } from '~/shared/button'
import { c } from '~/utils/core'

import { type ComponentProps } from '../types'

export type Props = ComponentProps<UiButtonProps>

const NAME = 'dnp-layoutSchema-button'

function Component(props: Props): React.ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, propsState, children, content, context, block, setProps, ...restProps } = props

  // @ts-ignore
  return (
    <UiButton {...restProps} className={c(NAME, className)}>
      {content || children}
    </UiButton>
  )
}

const Button = memo(Component)
Button.displayName = NAME
export default Button

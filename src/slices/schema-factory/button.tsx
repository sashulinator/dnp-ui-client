import { memo } from 'react'

import UiButton, { type ButtonProps as UiButtonProps } from '~/shared/button'
import { c } from '~/utils/core'

import { type ComponentProps } from './models'

export type Props = ComponentProps<UiButtonProps>

const NAME = 'dnp-layoutSchema-button'

export const Button = memo((props: Props): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, content, context, block, setProps, blockComponent, ...restProps } = props

  // @ts-ignore
  return (
    <UiButton {...restProps} className={c(NAME, className)}>
      {content || children}
    </UiButton>
  )
})

Button.displayName = NAME

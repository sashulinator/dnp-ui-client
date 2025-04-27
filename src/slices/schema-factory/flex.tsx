import { memo } from 'react'

import UiFlex, { type FlexProps as UiFlexProps } from '~/shared/flex'
import { c } from '~/utils/core'

import { type ComponentProps } from './models'

export type Props = ComponentProps<UiFlexProps>

const NAME = 'dnp-layoutSchema-flex'

export const Flex = memo((props: Props): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, content, context, block, setProps, blockComponent, ...restProps } = props

  // @ts-ignore
  return (
    <UiFlex {...restProps} className={c(NAME, className)}>
      {content || children}
    </UiFlex>
  )
})

Flex.displayName = NAME

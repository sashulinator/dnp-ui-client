import { memo } from 'react'

import UiFlex, { type FlexProps as UiFlexProps } from '~/shared/flex'
import { c } from '~/utils/core'

import { type ComponentProps } from '../types'

export type Props = ComponentProps<UiFlexProps & { hidden: boolean }>

const NAME = 'dnp-layoutSchema-flex'

export const Flex = memo((props: Props): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, content, context, block, hidden, setProps, blockComponent, ...restProps } = props

  if (hidden) return null

  // @ts-ignore
  return (
    <UiFlex {...restProps} className={c(NAME, className)}>
      {content === null ? null : content || children}
    </UiFlex>
  )
})

Flex.displayName = NAME

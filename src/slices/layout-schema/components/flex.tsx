import { memo } from 'react'

import UiFlex, { type FlexProps as UiFlexProps } from '~/shared/flex'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'

// Делаем Pick так как жалуется на типы внутри radix-ui
export type Props = ComponentProps<Pick<UiFlexProps, 'children'> & { content: React.ReactNode; hidden: boolean }>

const NAME = 'dnp-layoutSchema-flex'

function Component(props: Props): React.ReactNode {
  const [{ content, children, hidden, ...restProps }] = splitProps(props)

  if (hidden) return null

  return <UiFlex {...restProps}>{content === null ? null : content || children}</UiFlex>
}

const Flex = memo(Component)
Flex.displayName = NAME
export default Flex

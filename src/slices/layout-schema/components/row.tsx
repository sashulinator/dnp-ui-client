import { memo } from 'react'

import { type RowProps, Row as UiRow } from '~/shared/form'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'

// Делаем Pick так как жалуется на типы внутри radix-ui
export type Props = ComponentProps<Pick<RowProps, 'children'> & { content: React.ReactNode; hidden: boolean }>

const NAME = 'dnp-layoutSchema-row'

function Component(props: Props): React.ReactNode {
  const [{ content, children, hidden, ...restProps }] = splitProps(props)

  if (hidden) return null

  return <UiRow {...restProps}>{content === null ? null : content || children}</UiRow>
}

const Row = memo(Component)
Row.displayName = NAME
export default Row

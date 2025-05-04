import { memo } from 'react'

import { type ColumnProps, Column as UiColumn } from '~/shared/form'

import { splitProps } from '../lib.split-props'
import { type ComponentProps } from '../types'

// Делаем Pick так как жалуется на типы внутри radix-ui
export type Props = ComponentProps<Pick<ColumnProps, 'children'> & { content: React.ReactNode; hidden: boolean }>

const NAME = 'dnp-layoutSchema-column'

function Component(props: Props): React.ReactNode {
  const [{ content, children, hidden, ...restProps }] = splitProps(props)

  if (hidden) return null

  return <UiColumn {...restProps}>{content === null ? null : content || children}</UiColumn>
}

const Column = memo(Component)
Column.displayName = NAME
export default Column

import { cloneElement, useMemo } from 'react'

import type { Any, Dictionary } from '~/utils/core'

import { type ColumnProps } from '../ui.list'
import { injectIntoColumn } from './lib.inject-into-column'
import type { Context } from './models.contex'

export interface Props {
  columns: ColumnProps<Any, Any>[] | undefined
  context: Context<Dictionary>
  children: React.ReactElement<{ columns: unknown[]; context: Dictionary }>
}

const NAME = 'table-List-w-SortWrapper'

export default function Component(props: Props): JSX.Element {
  const { context, columns = [], children } = props

  const searchColumns = useMemo(() => columns.map(injectIntoColumn), [])

  return cloneElement(children, {
    ...children.props,
    columns: searchColumns,
    context: { ...children.props?.context, ...context },
  })
}

Component.displayName = NAME

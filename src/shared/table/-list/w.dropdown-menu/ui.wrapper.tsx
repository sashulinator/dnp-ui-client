import { cloneElement, useMemo } from 'react'

import type { Any, Dictionary } from '~/utils/core'

import { type Column } from '../types.ts'
import { injectIntoColumn } from './lib.inject-into-column.tsx'
import type { Context } from './type.contex.ts'

export interface Props {
  columns: Column<Any, Any>[] | undefined
  context: Context
  children: React.ReactElement<{ columns: unknown[]; context: Dictionary }>
}

const NAME = 'table-List-w-SortWrapper'

export default function Component(props: Props): JSX.Element {
  const { context, columns = [], children } = props

  const dropdownMenuColumns = useMemo(() => columns.map(injectIntoColumn), [columns])

  return cloneElement(children, {
    ...children.props,
    columns: dropdownMenuColumns,
    context: { ...children.props?.context, ...context },
  })
}

Component.displayName = NAME

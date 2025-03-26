import { cloneElement, useMemo } from 'react'

import type { Any, Dictionary } from '~/utils/core'

import { type Column } from '../types'
import { createColumn } from './create-column'
import type { Context } from './models.context'

export interface Props {
  columns: Column<Any, Any>[] | undefined
  context: Context<Any>
  children: React.ReactElement<{ columns: unknown[]; context: Dictionary }>
}

const NAME = 'table-List-w-Selection-w-TableWrapper'

export default function Component(props: Props): JSX.Element {
  const { context, columns = [], children } = props

  const injectedColumns = useMemo(() => [createColumn(), ...columns], [columns])

  return cloneElement(children, {
    ...children.props,
    columns: injectedColumns,
    context: { ...children.props?.context, ...context },
  })
}

Component.displayName = NAME

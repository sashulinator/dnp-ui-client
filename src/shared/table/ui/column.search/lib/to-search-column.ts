import { type Dictionary } from '~/utils/core'

import { type Column } from '../../column/models/column'
import { type Context } from '../models/contex'
import { HeaderCell } from '../widgets/_header-cell'

export function toSearchColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  return {
    ...column,
    renderHeader: HeaderCell,
    headerProps: {
      ...column.headerProps,
      style: {
        ...column.headerProps?.style,
        minWidth: '12rem',
        paddingLeft: 'var(--space-1)',
      },
    },
    cellProps: {
      ...column.cellProps,
      style: {
        ...column.cellProps?.style,
        // отступ headerCell=--space-1 и --space-2 это отступ placeholder'а в инпуте
        paddingLeft: 'calc((var(--space-1) + var(--space-2))',
      },
    },
  } satisfies Column<TItem, TContext>
}

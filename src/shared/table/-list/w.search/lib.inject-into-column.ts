import { type Dictionary } from '~/utils/core'

import { type Column } from '..'
import { type Context } from './models.contex'
import { HeaderCell } from './w._header-cell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  return {
    ...column,
    renderHeaderCell: HeaderCell,
    getHeaderCellProps(...args) {
      const headerCellProps = column.getHeaderCellProps?.(...args)
      return {
        ...headerCellProps,
        style: {
          minWidth: '12rem',
          paddingLeft: 'var(--space-1)',
          ...headerCellProps?.style,
        },
      }
    },
    getCellProps(...args) {
      const cellProps = column.getCellProps?.(...args)
      return {
        ...cellProps,
        style: {
          paddingLeft: 'calc((var(--space-1) + var(--space-2))',
          ...cellProps?.style,
        },
      }
    },
  } satisfies Column<TItem, TContext>
}

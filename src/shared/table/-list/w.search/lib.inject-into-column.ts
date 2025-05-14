import { type Dictionary } from '~/utils/core'

import { type Context } from './types'
import { type Column } from './types'
import { HeaderCell } from './w._header-cell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  // @ts-ignore
  if (column.searchable === false) return column

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

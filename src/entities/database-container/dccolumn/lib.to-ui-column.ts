// TODO убрать зависимость от common
import { type ListTable } from '~/shared/table'
import { type Dictionary } from '~/utils/core'
import { toHtml } from '~/utils/md'

import { type Dccolumn } from './types'

export function toUiColumn<TItem extends Dictionary, TContext extends Dictionary>(
  column: Dccolumn,
): ListTable.ColumnProps<TItem, TContext> {
  return {
    name: column.name,
    display: column.display,
    renderHeader: ({ display, name }) => (display ? toHtml(display) : (name as string)),
    renderCell: ({ value }) => value as string,
    headerProps: {
      style: {
        verticalAlign: 'middle',
        // TODO: убрать any
        textAlign: (column as any).type === 'integer' ? 'right' : 'left',
      },
    },
    cellProps: {
      style: {
        whiteSpace: 'nowrap',
        // TODO: убрать any
        textAlign: (column as any).type === 'integer' ? 'right' : 'left',
        verticalAlign: 'middle',
      },
    },
  }
}

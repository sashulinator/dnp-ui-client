// TODO убрать зависимость от common
import { type Column } from '~/common/slices/table'
import { type Dictionary } from '~/utils/core'
import { toHtml } from '~/utils/md'

import { type ColumnProps } from '../../shared/table/v.list/ui.list'

export function toTableColumn<TItem extends Dictionary, TContext extends Dictionary>(
  databaseColumn: Column,
): ColumnProps<TItem, TContext> {
  return {
    name: databaseColumn.name,
    display: databaseColumn.display,
    renderHeader: (item) => (item.display ? toHtml(item.display) : (item.name as string)),
    renderCell: ({ value }) => value as string,
    headerProps: {
      style: {
        verticalAlign: 'middle',
        textAlign: databaseColumn.type === 'integer' ? 'right' : 'left',
      },
    },
    cellProps: {
      style: {
        whiteSpace: 'nowrap',
        textAlign: databaseColumn.type === 'integer' ? 'right' : 'left',
        verticalAlign: 'middle',
      },
    },
  }
}

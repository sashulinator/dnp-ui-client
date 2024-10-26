import { type Column as DatabaseColumn } from '~dnp/slices/database'
import { type Dictionary } from '~dnp/utils/core'
import { toHtml } from '~dnp/utils/md'

import { type Column } from '../models/column'

export function fromDatabaseColumn<TItem extends Dictionary, TContext extends Dictionary>(
  databaseColumn: DatabaseColumn,
): Column<TItem, TContext> {
  return {
    accessorKey: databaseColumn.columnName,
    name: databaseColumn.name,
    renderHeader: ({ name }) => toHtml(name),
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
  } satisfies Column<TItem, TContext>
}

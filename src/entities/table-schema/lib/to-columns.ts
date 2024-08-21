import { TableSchemaItem } from '~/entities/operational-table'
import { TableListColumn } from '~/ui/table'

export function toColumns<T extends Record<string, unknown>>(items: TableSchemaItem[]): TableListColumn<T>[] {
  return items.map((item) => {
    return {
      key: item.columnName,
      renderHeader: () => item.name,
      renderCell: ({ value }) => {
        return value as string
      },
    }
  })
}

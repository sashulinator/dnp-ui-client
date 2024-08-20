/**
 * ui
 */

import { Table } from '@radix-ui/themes'

export default Table
export type {
  RootProps as TableRootProps,
  CellProps as TableCellProps,
  RowProps as TableRowProps,
  BodyProps as TableBodyProps,
  HeaderProps as TableHeaderProps,
  // куча типов...
} from '@radix-ui/themes/dist/esm/components/table.d.ts'

/**
 * variants
 */

export {
  default as TableList,
  type TableProps as TableListProps,
  type Column as TableListColumn,
} from './variants/list'

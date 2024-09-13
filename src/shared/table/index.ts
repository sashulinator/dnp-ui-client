/**
 * ui
 */
import { Table } from '@radix-ui/themes'

export default Table
export type {
  RootProps,
  CellProps,
  RowProps,
  BodyProps,
  HeaderProps,
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

/**
 * widgets
 */

export { default as SortingButton, type Props as SortingButtonProps } from './widgets/sorting-button/ui/sorting-button'

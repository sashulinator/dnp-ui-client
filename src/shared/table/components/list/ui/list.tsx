import Table, { type CellProps, type RootProps } from '~/shared/table'
import { type Dictionary, c } from '~/utils/core'

export interface RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  value: TItem[keyof TItem]
  item: TItem
  context: TContext
}

export interface RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  context: TContext
}

export interface Column<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  cellProps?: CellProps | undefined
  headerProps?: CellProps | undefined
  renderCell: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeader: (props: RenderHeaderProps<TItem, TContext>) => React.ReactNode
}

export type Props<TItem extends Dictionary, TContext extends Dictionary> = RootProps & {
  className?: string | undefined
  list: TItem[]
  columns: Column<TItem, TContext>[]
  context: TContext
}

export const NAME = 'table-List'

/**
 * ui-DataList-v-Table
 */
export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const { className, columns, list, context, ...rootTableProps } = props

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header>
        <Table.Row>
          {columns.map((column, i) => {
            return (
              <Table.ColumnHeaderCell key={i} {...column.headerProps}>
                {column.renderHeader({ accessorKey: column.accessorKey, context: context as TContext })}
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list.map((item, i) => {
          return (
            <Table.Row key={i}>
              {props.columns.map((column, i) => {
                return (
                  <Table.Cell key={i} {...column.cellProps}>
                    {column.renderCell({
                      accessorKey: column.accessorKey,
                      value: item[column.accessorKey],
                      context: context as TContext,
                      item,
                    })}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

Component.displayName = NAME

import Table, { type TableTypes } from '~/shared/table'
import { type Dictionary, c } from '~/utils/core'
import { getPath, toPath } from '~/utils/dictionary'

export interface RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  name: string
  value: TItem[keyof TItem]
  item: TItem
  context: TContext
}

export interface RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  context: TContext
  name: string
}

export interface Column<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  name: string
  cellProps?: TableTypes.CellProps | undefined
  headerProps?: TableTypes.CellProps | undefined
  renderCell: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeader: (props: RenderHeaderProps<TItem, TContext>) => React.ReactNode
}

export type Props<TItem extends Dictionary, TContext extends Dictionary> = TableTypes.RootProps & {
  className?: string | undefined
  list: TItem[]
  columns: Column<TItem, TContext>[]
  context: TContext
  rowProps?: TableTypes.RowProps | undefined
  headerRowProps?: TableTypes.RowProps | undefined
  headerProps?: TableTypes.HeaderProps | undefined
  columnHeaderCellProps?: TableTypes.ColumnHeaderCellProps | undefined
  cellProps?: TableTypes.CellProps | undefined
  bodyProps?: TableTypes.BodyProps | undefined
}

export const NAME = 'table-List'

/**
 * ui-DataList-v-Table
 */
export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const {
    bodyProps,
    className,
    cellProps,
    columns,
    columnHeaderCellProps,
    context,
    headerProps,
    headerRowProps,
    list,
    rowProps,
    ...rootTableProps
  } = props

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header {...headerProps}>
        <Table.Row {...headerRowProps}>
          {columns.map((column, i) => {
            const mergedProps = { ...columnHeaderCellProps, ...column.headerProps }
            return (
              <Table.ColumnHeaderCell key={i} {...mergedProps}>
                {column.renderHeader({
                  accessorKey: column.accessorKey,
                  name: column.name,
                  context: context as TContext,
                })}
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body {...bodyProps}>
        {list.map((item, i) => {
          return (
            <Table.Row {...rowProps} key={i}>
              {props.columns.map((column, i) => {
                const mergedProps = { ...cellProps, ...column.cellProps }
                return (
                  <Table.Cell key={i} {...mergedProps}>
                    {column.renderCell({
                      accessorKey: column.accessorKey,
                      value: getPath(item, toPath(column.accessorKey.toString())),
                      context: context as TContext,
                      name: column.name,
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

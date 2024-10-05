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
  rowProps?: (params: { item: TItem } & Props<TItem, TContext>) => TableTypes.RowProps | undefined
  headerRowProps?: (params: Props<TItem, TContext>) => TableTypes.RowProps | undefined
  headerProps?: (params: Props<TItem, TContext>) => TableTypes.HeaderProps | undefined
  columnHeaderCellProps?: (
    props: { params: Column<TItem, TContext> } & Props<TItem, TContext>,
  ) => TableTypes.ColumnHeaderCellProps | undefined
  cellProps?: (
    params: { item: TItem; column: Column<TItem, TContext> } & Props<TItem, TContext>,
  ) => TableTypes.CellProps | undefined
  bodyProps?: (params: Props<TItem, TContext>) => TableTypes.BodyProps | undefined
}

export const NAME = 'table-List'

/**
 * ui-DataList-v-Table
 */
export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const {
    className,
    columns,
    context,
    list,
    bodyProps,
    cellProps,
    columnHeaderCellProps,
    headerProps,
    headerRowProps,
    rowProps,
    ...rootTableProps
  } = props

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header {...headerProps?.(props)}>
        <Table.Row {...headerRowProps?.(props)}>
          {columns.map((column, i) => {
            const mergedProps = { ...columnHeaderCellProps?.({ params: column, ...props }), ...column.headerProps }
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
      <Table.Body {...bodyProps?.(props)}>
        {list.map((item, i) => {
          return (
            <Table.Row {...rowProps?.({ item, ...props })} key={i}>
              {props.columns.map((column, i) => {
                const mergedProps = { ...cellProps?.({ column, item, ...props }), ...column.cellProps }
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

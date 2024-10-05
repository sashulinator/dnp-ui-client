import { type UiErrorable } from '~/shared/error'
import Flex from '~/shared/flex'
import Spinner from '~/shared/spinner'
import Table, { type TableTypes } from '~/shared/table'
import Text from '~/shared/text'
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
  loading?: boolean | undefined
  error?: UiErrorable | null | undefined
  columns: Column<TItem, TContext>[]
  context: TContext
  rowProps?: (params: { item: TItem; rowIndex: number } & Props<TItem, TContext>) => TableTypes.RowProps | undefined
  headerRowProps?: (params: Props<TItem, TContext>) => TableTypes.RowProps | undefined
  headerProps?: (params: Props<TItem, TContext>) => TableTypes.HeaderProps | undefined
  columnHeaderCellProps?: (
    props: { params: Column<TItem, TContext> } & Props<TItem, TContext>,
  ) => TableTypes.ColumnHeaderCellProps | undefined
  cellProps?: (
    params: { item: TItem; rowIndex: number; columnIndex: number; column: Column<TItem, TContext> } & Props<
      TItem,
      TContext
    >,
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
    error,
    loading,
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
        {list.length === 0 ? (
          <Table.Row
            style={{
              backgroundColor: 'var(--table-row-background-color)',
              display: 'flex',
              height: '5rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <td>
              {loading ? (
                <Spinner />
              ) : error ? null : (
                <Text size='1' style={{ textTransform: 'uppercase', color: 'var(--gray-10)' }}>
                  Нет данных
                </Text>
              )}
              {!loading && error && (
                <Flex direction='column' gap='1' align='center'>
                  <Text size='1' style={{ textTransform: 'uppercase' }} color='red'>
                    {error.message}
                  </Text>
                  <Text size='1' color='red'>
                    {error.description}
                  </Text>
                </Flex>
              )}
            </td>
          </Table.Row>
        ) : (
          list.map((item, rowIndex) => {
            const gottenRowProps = rowProps?.({ item, rowIndex, ...props })
            return (
              <Table.Row {...gottenRowProps} key={gottenRowProps?.key || rowIndex}>
                {props.columns.map((column, columnIndex) => {
                  const mergedProps = {
                    ...cellProps?.({ column, columnIndex, rowIndex, item, ...props }),
                    ...column.cellProps,
                  }
                  return (
                    <Table.Cell key={columnIndex} {...mergedProps}>
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
          })
        )}
      </Table.Body>
    </Table.Root>
  )
}

Component.displayName = NAME

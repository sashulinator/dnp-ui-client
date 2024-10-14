import { createElement } from 'react'

import ErrorBoundary from '~/shared/error-boundary'
import Flex from '~/shared/flex'
import Table, { type TableTypes } from '~/shared/table'
import Text from '~/shared/text'
import { type Dictionary, c } from '~/utils/core'
import { getPath, toPath } from '~/utils/dictionary'

import { type Column } from '../../column/models/column'
import { default as Sort } from '../widgets/sort'

export type RowProps<TItem extends Dictionary, TContext extends Dictionary> = { item: TItem; rowIndex: number } & Props<
  TItem,
  TContext
>

export type Props<TItem extends Dictionary, TContext extends Dictionary> = TableTypes.RootProps & {
  className?: string | undefined
  list: TItem[]
  columns: Column<TItem, TContext>[]
  context: TContext
  getRowProps?: (params: { item: TItem; rowIndex: number } & Props<TItem, TContext>) => TableTypes.RowProps | undefined
  getHeaderRowProps?: (params: Props<TItem, TContext>) => TableTypes.RowProps | undefined
  getHeaderProps?: (params: Props<TItem, TContext>) => TableTypes.HeaderProps | undefined
  getColumnHeaderCellProps?: (
    props: { params: Column<TItem, TContext> } & Props<TItem, TContext>,
  ) => TableTypes.ColumnHeaderCellProps | undefined
  getCellProps?: (
    params: { item: TItem; rowIndex: number; columnIndex: number; column: Column<TItem, TContext> } & Props<
      TItem,
      TContext
    >,
  ) => TableTypes.CellProps | undefined
  getBodyProps?: (params: Props<TItem, TContext>) => TableTypes.BodyProps | undefined
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
    getBodyProps,
    getCellProps,
    getColumnHeaderCellProps,
    getHeaderProps,
    getHeaderRowProps,
    getRowProps,
    ...rootTableProps
  } = props

  return (
    <ErrorBoundary fallback={'Неожиданная ошибка! Обратитесь к администратору!'}>
      <Flex direction={'column'}>
        <Table.Root className={c(className, NAME)} {...rootTableProps}>
          <Table.Header {...getHeaderProps?.(props)}>
            <Table.Row {...getHeaderRowProps?.(props)}>
              {columns.map((column, i) => {
                const mergedProps = {
                  ...getColumnHeaderCellProps?.({ params: column, ...props }),
                  ...column.headerProps,
                }
                return (
                  <Table.ColumnHeaderCell key={i} {...mergedProps}>
                    {createElement(column.renderHeader, {
                      accessorKey: column.accessorKey,
                      name: column.name,
                      list,
                      context: context as TContext,
                    })}
                  </Table.ColumnHeaderCell>
                )
              })}
            </Table.Row>
          </Table.Header>
          {list.length !== 0 && (
            <Table.Body {...getBodyProps?.(props)}>
              {list.map((item, rowIndex) => {
                const rowProps = getRowProps?.({ item, rowIndex, ...props })
                return (
                  <Table.Row {...rowProps} key={rowProps?.key || rowIndex}>
                    {props.columns.map((column, columnIndex) => {
                      const mergedProps = {
                        ...getCellProps?.({ column, columnIndex, rowIndex, item, ...props }),
                        ...column.cellProps,
                      }
                      return (
                        <Table.Cell key={columnIndex} {...mergedProps}>
                          {createElement(column.renderCell, {
                            accessorKey: column.accessorKey,
                            value: getPath(item, toPath(column.accessorKey.toString())),
                            context: context as TContext,
                            name: column.name,
                            item,
                            list,
                          })}
                        </Table.Cell>
                      )
                    })}
                  </Table.Row>
                )
              })}
            </Table.Body>
          )}
        </Table.Root>
        {list.length === 0 && (
          <Flex
            align='center'
            justify='center'
            height='100px'
            style={{ backgroundColor: 'var(--table-row-background-color)' }}
          >
            <Text size='1' style={{ textTransform: 'uppercase', color: 'var(--gray-10)' }}>
              Нет данных
            </Text>
          </Flex>
        )}
      </Flex>
    </ErrorBoundary>
  )
}

Component.displayName = NAME
Component.Sort = Sort

import type { CSSProperties } from 'react'
import { createElement } from 'react'

import ErrorBoundary from '~/shared/error-boundary'
import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { type Dictionary, c } from '~/utils/core'
import { getPath, toPath } from '~/utils/dictionary'
import { toHtml } from '~/utils/md'

import Table, { type TableProps } from '../ui/table'

export { type TableProps }

export interface RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> {
  name: keyof TItem
  display?: string | undefined
  value: TItem[keyof TItem]
  list: TItem[]
  item: TItem
  context: TContext
}

export interface RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> {
  name: keyof TItem
  context: TContext
  display?: string | undefined
  list: TItem[]
}

export interface ColumnProps<TItem extends Dictionary, TContext extends Dictionary> {
  name: keyof TItem
  display?: string | undefined
  cellProps?: TableProps.CellProps | undefined
  headerProps?: TableProps.CellProps | undefined
  renderCell?: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeader?: (props: RenderHeaderProps<TItem, TContext>) => React.ReactNode
}

export type RowProps<TItem extends Dictionary, TContext extends Dictionary> = { item: TItem; rowIndex: number } & Props<
  TItem,
  TContext
>

export type GetCellPropsParams<TItem extends Dictionary, TContext extends Dictionary> = {
  item: TItem
  rowIndex: number
  columnIndex: number
  column: ColumnProps<TItem, TContext>
} & Props<TItem, TContext>

export type Props<TItem extends Dictionary, TContext extends Dictionary> = TableProps.RootProps & {
  className?: string | undefined
  list: TItem[]
  columns: ColumnProps<TItem, TContext>[]
  context: TContext
  getRowProps?: (params: { item: TItem; rowIndex: number } & Props<TItem, TContext>) => TableProps.RowProps | undefined
  getHeaderRowProps?: (params: Props<TItem, TContext>) => TableProps.RowProps | undefined
  getHeaderProps?: (params: Props<TItem, TContext>) => TableProps.HeaderProps | undefined
  getColumnHeaderCellProps?: (
    props: { column: ColumnProps<TItem, TContext> } & Props<TItem, TContext>,
  ) => TableProps.ColumnHeaderCellProps | undefined
  getCellProps?: (params: GetCellPropsParams<TItem, TContext>) => TableProps.CellProps | undefined
  getBodyProps?: (params: Props<TItem, TContext>) => TableProps.BodyProps | undefined
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
                  ...getColumnHeaderCellProps?.({ column: column, ...props }),
                  ...column.headerProps,
                }

                const renderHeader = column.renderHeader || defaultRenderHeader

                return (
                  <Table.ColumnHeaderCell key={i} {...mergedProps} style={getCellStyles(mergedProps.style)}>
                    {createElement(renderHeader, {
                      name: column.name,
                      display: column.display,
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

                      const renderCell = column.renderCell || defaultRenderCell

                      return (
                        <Table.Cell key={columnIndex} {...mergedProps} style={getCellStyles(mergedProps.style)}>
                          {createElement(renderCell, {
                            name: column.name,
                            value: getPath(item, toPath(column.name.toString())),
                            context: context as TContext,
                            display: column.display,
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

  /**
   * private
   */

  function getCellStyles(style: CSSProperties | undefined) {
    return {
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      ...style,
    }
  }
}

export function defaultRenderCell(params: { value: unknown }) {
  return String(params.value)
}

export function defaultRenderHeader(params: { name: string | number | symbol; display?: string | undefined }) {
  return params.display ? toHtml(params.display) : String(params.name)
}

Component.displayName = NAME

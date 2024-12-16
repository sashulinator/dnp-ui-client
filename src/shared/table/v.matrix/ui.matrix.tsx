import { useMemo } from 'react'

import { ListTable } from '~/shared/table'
import { type Any, type Dictionary, c } from '~/utils/core'
import { setPath } from '~/utils/dictionary'

import { defaultRenderCell, defaultRenderHeader } from '../v.list/ui.list'

export type CellProps = ListTable.CellProps

export type RootProps = ListTable.RootProps

export type BodyProps = ListTable.BodyProps

export type HeaderProps = ListTable.HeaderProps

export type RowProps = ListTable.RowProps

export type ColumnHeaderCellProps = ListTable.RowProps

export type Option = { value: string; display: string; columnTypes?: string[] }

export interface RenderCellProps<TItem extends Dictionary, TContext extends Dictionary, TValue> {
  name: keyof TItem
  display?: string | undefined
  value: TItem[keyof TItem]
  list: TItem[]
  item: TItem
  context: TContext
  onValueChange: (value: TValue) => void
}

export interface RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> {
  name: keyof TItem
  context: TContext
  display?: string | undefined
  list: TItem[]
}

export interface ColumnProps<TItem extends Dictionary, TContext extends Dictionary, TValue> {
  name: keyof TItem
  type?: string
  display?: string | undefined
  cellProps?: CellProps | undefined
  headerProps?: CellProps | undefined
  renderCell?: (props: RenderCellProps<TItem, TContext, TValue>) => React.ReactNode
  renderHeader?: (props: RenderHeaderProps<TItem, TContext>) => React.ReactNode
}

export type RenderOptionCellProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = Omit<
  RenderCellProps<TItem, TContext, TValue>,
  'onValueChange'
> & {
  option: Option
}

export type RenderOptionHeaderProps<TItem extends Dictionary, TContext extends Dictionary> = RenderHeaderProps<
  TItem,
  TContext
>

export type GetCellPropsParams<TItem extends Dictionary, TContext extends Dictionary, TValue> = {
  item: TItem
  rowIndex: number
  columnIndex: number
  column: ColumnProps<TItem, TContext, TValue>
} & Props<TItem, TContext, TValue>

export type GetBodyProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = Props<TItem, TContext, TValue>

export type GetColumnHeaderCellProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = Props<
  TItem,
  TContext,
  TValue
> & {
  column: ColumnProps<TItem, TContext, TValue>
}

export type GetHeaderProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = Props<
  TItem,
  TContext,
  TValue
>

export type GetHeaderRowProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = Props<
  TItem,
  TContext,
  TValue
>

export type GetRowProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = Props<
  TItem,
  TContext,
  TValue
> & {
  item: TItem
  rowIndex: number
}

export interface Props<TItem extends Dictionary, TContext extends Dictionary, TValue> {
  className?: string | undefined
  columns: ColumnProps<TItem, TContext, TValue>[]
  options: Option[]
  values: Record<string, Record<string, TValue>>
  context: TContext
  renderOptionHeader?: (props: RenderOptionHeaderProps<TItem, TContext>) => React.ReactNode
  renderOptionCell?: (props: RenderOptionCellProps<TItem, TContext, TValue>) => React.ReactNode
  renderCell?: (props: RenderCellProps<TItem, TContext, TValue>) => React.ReactNode
  onValuesChange: (values: Record<string, Record<string, TValue>>, value: TValue) => void
  getRowProps?: (params: GetRowProps<TItem, TContext, TValue>) => RowProps | undefined
  getHeaderRowProps?: (params: GetHeaderRowProps<TItem, TContext, TValue>) => RowProps | undefined
  getHeaderProps?: (params: GetHeaderProps<TItem, TContext, TValue>) => HeaderProps | undefined
  getCellProps?: (params: GetCellPropsParams<TItem, TContext, TValue>) => CellProps | undefined
  getBodyProps?: (params: GetBodyProps<TItem, TContext, TValue>) => BodyProps | undefined
  getColumnHeaderCellProps?: (
    props: GetColumnHeaderCellProps<TItem, TContext, TValue>,
  ) => ColumnHeaderCellProps | undefined
}

const NAME = `table-MatrixTable`
const FIRST_COLUMN_NAME = 'Ыカ' // случайно сгенерированно ибо не должно совпасть с названием колонки

export default function Component<TItem extends Dictionary, TContext extends Dictionary, TValue>(
  props: Props<TItem, TContext, TValue>,
): JSX.Element {
  const {
    columns,
    options,
    values,
    onValuesChange,
    renderCell: renderCellProp,
    renderOptionCell: renderOptionCellProp,
    renderOptionHeader: renderOptionHeaderProp,
    ...tableProps
  } = props

  const newColumns = useMemo(_buildColumns, [values, columns])
  const list = useMemo(_buildList, [values, columns])

  return (
    <ListTable.default<Any, Any> // ставим Any так как слишком абстрактные материи
      {...(tableProps as Any)}
      list={list as Any}
      columns={newColumns as Any}
      className={c(props.className, NAME)}
    />
  )

  /**
   * private
   */

  function _buildList() {
    const list = []
    for (let rowI = 0; rowI < options.length; rowI++) {
      const item: Record<string, unknown> = {}
      const option = options[rowI]
      item[FIRST_COLUMN_NAME] = option.value
      for (let columnI = 0; columnI < columns.length; columnI++) {
        const columnName = columns[columnI].name as string
        item[columnName] = values?.[columnName]?.[option.value]
      }
      list.push(item)
    }
    return list
  }

  function _buildColumns(): ColumnProps<TItem, TContext, TValue>[] {
    const firstColumn = { name: FIRST_COLUMN_NAME }
    return [firstColumn, ...columns].map(_injectColumnProps)
  }

  function _injectColumnProps(columns: ColumnProps<TItem, TContext, TValue>): ColumnProps<TItem, TContext, TValue> {
    return {
      ...columns,
      renderCell(props) {
        if (props.name === FIRST_COLUMN_NAME) {
          const renderOptionCell = renderOptionCellProp || defaultRenderOptionCell
          return renderOptionCell?.({
            ...props,
            // TODO: не через find сделать
            option: options.find((o) => o.value === props.item[FIRST_COLUMN_NAME]) as Option,
          })
        }
        const renderCell = renderCellProp || columns.renderCell || defaultRenderCell
        return renderCell({
          ...props,
          onValueChange: (value) => {
            onValuesChange(
              setPath(values, [columns.name as string, props.item[FIRST_COLUMN_NAME] as string], value),
              value,
            )
          },
        })
      },
      renderHeader(props) {
        if (props.name === FIRST_COLUMN_NAME) {
          const renderOptionHeader = renderOptionHeaderProp || defaultRenderOptionHeader
          return renderOptionHeader?.(props)
        }
        const renderHeader = columns.renderHeader || defaultRenderHeader
        return renderHeader(props)
      },
    }
  }
}

Component.displayName = NAME

export function defaultRenderOptionCell(props: { value: unknown }) {
  return String(props.value)
}

export function defaultRenderOptionHeader() {
  return ''
}

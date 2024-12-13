import { useMemo } from 'react'

import { ListTable } from '~/shared/table'
import { type Any, type Dictionary, c } from '~/utils/core'
import { setPath } from '~/utils/dictionary'

import { defaultRenderCell, defaultRenderHeader } from '../v.list/ui.list'

export type Options = {
  value: unknown
  display: string
}

export type Option = {
  value: string
  display: string
}

export type RenderCellProps<TItem extends Dictionary, TContext extends Dictionary, TValue> = ListTable.RenderCellProps<
  TItem,
  TContext
> & {
  onValueChange: (value: TValue) => void
}
export type RenderOptionCellProps<TItem extends Dictionary, TContext extends Dictionary> = ListTable.RenderCellProps<
  TItem,
  TContext
> & {
  option: Option
}
export type RowProps<TItem extends Dictionary, TContext extends Dictionary> = ListTable.RowProps<TItem, TContext>
export type ColumnProps<TItem extends Dictionary, TContext extends Dictionary> = ListTable.ColumnProps<TItem, TContext>
export type RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> = ListTable.RenderHeaderProps<
  TItem,
  TContext
>
export type RenderOptionHeaderProps<
  TItem extends Dictionary,
  TContext extends Dictionary,
> = ListTable.RenderHeaderProps<TItem, TContext>

export interface Props<TItem extends Dictionary, TContext extends Dictionary, TValue> {
  className?: string | undefined
  columns: ListTable.ColumnProps<TItem, TContext>[]
  options: Option[]
  values: Record<string, Record<string, TValue>>
  renderOptionHeader?: (props: RenderOptionHeaderProps<TItem, TContext>) => React.ReactNode
  renderOptionCell?: (props: RenderOptionCellProps<TItem, TContext>) => React.ReactNode
  renderCell?: (props: RenderCellProps<TItem, TContext, TValue>) => React.ReactNode
  onValuesChange: (values: Record<string, Record<string, TValue>>, value: TValue) => void
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
  } = props

  const newColumns = useMemo(_buildColumns, [values, columns])
  const list = useMemo(_buildList, [values, columns])

  return (
    <ListTable.default<Any, Any> context={{}} list={list} columns={newColumns} className={c(props.className, NAME)} />
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

  function _buildColumns() {
    const firstColumn = { name: FIRST_COLUMN_NAME }
    return [firstColumn, ...columns].map(_injectColumnProps)
  }

  function _injectColumnProps(columns: ListTable.ColumnProps<TItem, TContext>): ListTable.ColumnProps<TItem, TContext> {
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

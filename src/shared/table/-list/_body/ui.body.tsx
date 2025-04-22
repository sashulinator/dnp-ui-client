import { createElement } from 'react'

import { type Dictionary } from '~/utils/core'
import { getPath, toPath } from '~/utils/dictionary'
import { mergeStyles } from '~/utils/react'

import * as Table from '../../ui.table'
import type {
  BaseProps,
  BodyProps,
  CellProps,
  GetBodyPropsParams,
  GetCellPropsParams,
  GetRowPropsParams,
  RenderCellProps,
  RowProps,
} from '../types'

export type Props<TItem extends Dictionary, TContext extends Dictionary> = Omit<
  BaseProps<TItem, TContext>,
  'renderCell'
> & {
  getRowProps: ((params: GetRowPropsParams<TItem, TContext>) => RowProps | undefined) | undefined
  getBodyProps: ((params: GetBodyPropsParams<TItem, TContext>) => BodyProps | undefined) | undefined
  getCellProps: ((params: GetCellPropsParams<TItem, TContext>) => CellProps | undefined) | undefined
  renderCell: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
}

const NAME = 'table--list-_body'

export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const { columns = [], context, list, renderCell, getBodyProps, getCellProps, getRowProps } = props

  return (
    <Table.Body className={NAME} {...getBodyProps?.(props)}>
      {list.map((item, rowIndex) => {
        const rowProps = getRowProps?.({ item, rowIndex, ...props })
        return (
          <Table.Row {...rowProps} key={rowProps?.key || rowIndex}>
            {columns.map((column, columnIndex) => {
              const mergedProps = {
                ...getCellProps?.({ column, columnIndex, rowIndex, item, ...props }),
                ...column.getCellProps?.({ column, columnIndex, rowIndex, item, ...props }),
              }

              const render = column.renderCell || renderCell

              return (
                <Table.Cell
                  key={columnIndex}
                  {...mergedProps}
                  style={mergeStyles({ verticalAlign: 'middle', whiteSpace: 'nowrap' }, mergedProps.style)}
                >
                  {createElement(render, {
                    name: column.name,
                    value: getPath(item, toPath(column.name.toString())),
                    context: context as TContext,
                    display: column.display,
                    item,
                    rowIndex,
                    columnIndex,
                    column,
                    list,
                  })}
                </Table.Cell>
              )
            })}
          </Table.Row>
        )
      })}
    </Table.Body>
  )
}

Component.displayName = NAME

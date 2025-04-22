import { createElement } from 'react'

import { type Dictionary } from '~/utils/core'
import { mergeStyles } from '~/utils/react'

import * as Table from '../../ui.table'
import type {
  BaseProps,
  GetHeaderCellPropsParams,
  GetHeaderPropsParams,
  GetHeaderRowPropsParams,
  HeaderCellProps,
  HeaderProps,
  HeaderRowProps,
  RenderHeaderCellProps,
} from '../types'

export type Props<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<TItem, TContext> & {
  getHeaderRowProps: ((params: GetHeaderRowPropsParams<TItem, TContext>) => HeaderRowProps | undefined) | undefined
  getHeaderProps: ((params: GetHeaderPropsParams<TItem, TContext>) => HeaderProps | undefined) | undefined
  getHeaderCellProps: ((params: GetHeaderCellPropsParams<TItem, TContext>) => HeaderCellProps | undefined) | undefined
  renderHeaderCell: (props: RenderHeaderCellProps<TItem, TContext>) => React.ReactNode
}

const NAME = 'table--list-_header'

export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const { columns = [], context, list, renderHeaderCell, getHeaderCellProps, getHeaderProps, getHeaderRowProps } = props

  return (
    <Table.Header className={NAME} {...getHeaderProps?.(props)}>
      <Table.Row {...getHeaderRowProps?.(props)}>
        {columns.map((column, columnIndex) => {
          const mergedProps = {
            ...getHeaderCellProps?.({ column, columnIndex, ...props }),
            ...column.getHeaderCellProps?.({ column, columnIndex, ...props }),
          }

          const render = column.renderHeaderCell || renderHeaderCell

          return (
            <Table.ColumnHeaderCell
              key={columnIndex}
              {...mergedProps}
              style={mergeStyles({ verticalAlign: 'middle', whiteSpace: 'nowrap' }, mergedProps.style)}
            >
              {createElement(render, {
                name: column.name,
                display: column.display,
                columns,
                column,
                columnIndex,
                list,
                context: context as TContext,
              })}
            </Table.ColumnHeaderCell>
          )
        })}
      </Table.Row>
    </Table.Header>
  )
}

Component.displayName = NAME

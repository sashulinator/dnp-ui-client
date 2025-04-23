import './list.scss'

import { type Dictionary, c } from '~/utils/core'

import * as Table from '../ui.table'
import _Body from './_body'
import _Header from './_header'
import _NoColumns from './_no-columns'
import _NoData from './_no-data'
import { defaultRenderCell } from './lib.default-render-cell'
import { defaultRenderHeaderCell } from './lib.default-render-header-cell'
import type {
  BaseProps,
  BodyProps,
  CellProps,
  GetBodyPropsParams,
  GetCellPropsParams,
  GetHeaderCellPropsParams,
  GetHeaderPropsParams,
  GetHeaderRowPropsParams,
  GetRowPropsParams,
  HeaderCellProps,
  HeaderProps,
  HeaderRowProps,
  RenderCellProps,
  RenderHeaderCellProps,
  RootProps,
  RowProps,
} from './types'

export type Props<TItem extends Dictionary, TContext extends Dictionary> = RootProps &
  BaseProps<TItem, TContext> & {
    className?: string | undefined
    rowSelectable?: boolean | undefined
    getHeaderProps?: (params: GetHeaderPropsParams<TItem, TContext>) => HeaderProps | undefined
    getHeaderRowProps?: (params: GetHeaderRowPropsParams<TItem, TContext>) => HeaderRowProps | undefined
    getHeaderCellProps?: (params: GetHeaderCellPropsParams<TItem, TContext>) => HeaderCellProps | undefined
    getBodyProps?: (params: GetBodyPropsParams<TItem, TContext>) => BodyProps | undefined
    getRowProps?: (params: GetRowPropsParams<TItem, TContext>) => RowProps | undefined
    getCellProps?: (params: GetCellPropsParams<TItem, TContext>) => CellProps | undefined
    renderCell?: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
    renderHeaderCell?: (props: RenderHeaderCellProps<TItem, TContext>) => React.ReactNode
  }

export const NAME = 'table--list'

export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const {
    className,
    columns = [],
    list,
    rowSelectable,
    getHeaderProps,
    getHeaderRowProps,
    getHeaderCellProps,
    renderHeaderCell,
    getBodyProps,
    getRowProps,
    getCellProps,
    renderCell,
    ...rootTableProps
  } = props

  return (
    <Table.Root
      style={{ tableLayout: 'auto' }}
      className={c(className, NAME, rowSelectable && '--row-selectable')}
      {...rootTableProps}
    >
      {columns.length > 0 ? (
        <_Header
          getHeaderProps={getHeaderProps}
          getHeaderRowProps={getHeaderRowProps}
          getHeaderCellProps={getHeaderCellProps}
          renderHeaderCell={renderHeaderCell || defaultRenderHeaderCell}
          {...props}
        />
      ) : (
        <_NoColumns />
      )}
      {list.length > 0 ? (
        <_Body
          getBodyProps={getBodyProps}
          getRowProps={getRowProps}
          getCellProps={getCellProps}
          renderCell={renderCell || defaultRenderCell}
          {...props}
        />
      ) : (
        <_NoData columnLength={columns.length} />
      )}
    </Table.Root>
  )
}

Component.displayName = NAME

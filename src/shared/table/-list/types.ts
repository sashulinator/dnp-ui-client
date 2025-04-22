import type { Dictionary } from '~/utils/core'

import type * as Table from '../ui.table'

export type RootProps = Table.RootProps

export type HeaderProps = Table.HeaderProps

export type HeaderRowProps = Table.RowProps

export type HeaderCellProps = Table.CellProps

export type BodyProps = Table.BodyProps

export type CellProps = Table.CellProps

export type RowProps = Table.RowProps

export type BaseProps<TItem extends Dictionary, TContext extends Dictionary> = RootProps & {
  list: TItem[]
  columns?: Column<TItem, TContext>[] | undefined
  context: TContext
  renderCell?: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeaderCell?: (props: RenderHeaderCellProps<TItem, TContext>) => React.ReactNode
}

export type RenderHeaderCellProps<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<
  TItem,
  TContext
> & {
  name: keyof TItem
  display?: string | undefined
  column: Column<TItem, TContext>
  columnIndex: number
}

export type RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> = RenderHeaderCellProps<
  TItem,
  TContext
> & {
  name: keyof TItem
  display?: string | undefined
  value: TItem[keyof TItem]
  item: TItem
  rowIndex: number
}

export interface Column<TItem extends Dictionary, TContext extends Dictionary> {
  name: keyof TItem
  type?: string | undefined
  display?: string | undefined
  getCellProps?: (params: GetCellPropsParams<TItem, TContext>) => CellProps | undefined
  getHeaderCellProps?: (params: GetHeaderCellPropsParams<TItem, TContext>) => HeaderCellProps | undefined
  renderCell?: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeaderCell?: (props: RenderHeaderCellProps<TItem, TContext>) => React.ReactNode
}

export type GetCellPropsParams<TItem extends Dictionary, TContext extends Dictionary> = {
  item: TItem
  rowIndex: number
  columnIndex: number
  column: Column<TItem, TContext>
} & BaseProps<TItem, TContext>

export type GetBodyPropsParams<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<TItem, TContext>

export type GetHeaderCellPropsParams<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<
  TItem,
  TContext
> & {
  column: Column<TItem, TContext>
  columnIndex: number
}

export type GetHeaderPropsParams<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<TItem, TContext>

export type GetHeaderRowPropsParams<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<TItem, TContext>

export type GetRowPropsParams<TItem extends Dictionary, TContext extends Dictionary> = BaseProps<TItem, TContext> & {
  item: TItem
  rowIndex: number
}

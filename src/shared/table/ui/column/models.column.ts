import { type Dictionary } from '~/utils/core'

import { type TableProps } from '../table'

export interface RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  name: string
  value: TItem[keyof TItem]
  list: TItem[]
  item: TItem
  context: TContext
}

export interface RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  context: TContext
  name: string
  list: TItem[]
}

export interface Column<TItem extends Dictionary, TContext extends Dictionary> {
  accessorKey: keyof TItem
  name: string
  cellProps?: TableProps.CellProps | undefined
  headerProps?: TableProps.CellProps | undefined
  renderCell: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeader: (props: RenderHeaderProps<TItem, TContext>) => React.ReactNode
}

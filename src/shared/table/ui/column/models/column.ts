import { type Dictionary } from '~dnp/utils/core'

import { type CellProps } from '../../table/ui/table'

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
  cellProps?: CellProps | undefined
  headerProps?: CellProps | undefined
  renderCell: (props: RenderCellProps<TItem, TContext>) => React.ReactNode
  renderHeader: (props: RenderHeaderProps<TItem, TContext>) => React.ReactNode
}

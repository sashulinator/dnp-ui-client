import Body, { type BodyProps } from './body'
import Cell, { type CellProps } from './cell'
import ColumnHeaderCell, { type ColumnHeaderCellProps } from './column-header-cell'
import Header, { type HeaderProps } from './header'
import Root, { type RootProps } from './root'
import Row, { type RowProps } from './row'
import RowHeaderCell, { type RowHeaderCellProps } from './row-header-cell'

const Table = {
  Body,
  Cell,
  Header,
  Root,
  Row,
  ColumnHeaderCell,
  RowHeaderCell,
}

export default Table

export type { BodyProps, CellProps, ColumnHeaderCellProps, HeaderProps, RootProps, RowHeaderCellProps, RowProps }

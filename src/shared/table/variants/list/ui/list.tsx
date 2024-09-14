import Table, { type CellProps, type RootProps } from '~/shared/table'
import { c } from '~/utils/core'

export interface Column<TDataItem extends Record<string, unknown>> {
  key: keyof TDataItem
  cellProps?: CellProps | undefined
  headerProps?: CellProps | undefined
  renderCell: (props: { key: keyof TDataItem; value: TDataItem[keyof TDataItem]; item: TDataItem }) => React.ReactNode
  renderHeader: (props: { key: keyof TDataItem }) => React.ReactNode
}

export type Props<TDataItem extends Record<string, unknown>> = RootProps & {
  className?: string | undefined
  list: TDataItem[]
  columns: Column<TDataItem>[]
}

export const NAME = 'ui-Table-v-List'

/**
 * ui-DataList-v-Table
 */
export default function Component<TDataItem extends Record<string, unknown>>(props: Props<TDataItem>): JSX.Element {
  const { className, columns, list, ...rootTableProps } = props

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header>
        <Table.Row>
          {columns.map((column, i) => {
            return (
              <Table.ColumnHeaderCell key={i} {...column.headerProps}>
                {column.renderHeader({ key: column.key })}
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list.map((item, i) => {
          return (
            <Table.Row key={i}>
              {props.columns.map((column, i) => {
                return (
                  <Table.Cell key={i} {...column.cellProps}>
                    {column.renderCell({ key: column.key, item, value: item[column.key] })}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

Component.displayName = NAME

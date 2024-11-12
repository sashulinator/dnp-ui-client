import { Table } from '@radix-ui/themes'
import { type RootProps } from '@radix-ui/themes/dist/esm/components/table.d.ts'

import React from 'react'

import { type TableTypes } from '~/shared/table'
import { c } from '~/utils/core'

import { type Item } from '../../../../../models/explorer'
import { useContext } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../root'

export interface Column<TDataItem extends Record<string, unknown>, TContext extends Record<string, unknown>> {
  accessorKey: keyof TDataItem
  name: string
  cellProps?: TableTypes.CellProps | undefined
  headerProps?: TableTypes.CellProps | undefined
  context?: TContext | undefined
  renderCell: (props: {
    accessorKey: keyof TDataItem
    name: string
    value: TDataItem[keyof TDataItem]
    item: TDataItem
    context?: TContext | undefined
  }) => React.ReactNode
  renderHeader: (props: {
    accessorKey: keyof TDataItem
    name: string
    context?: TContext | undefined
  }) => React.ReactNode
}

export type Props<TContext extends Record<string, unknown>> = RootProps & {
  className?: string | undefined
  columns: Column<Record<string, unknown>, TContext>[]
}

export const NAME = `${ROOT_NAME}-c-Table`

export default function Component<TContext extends Record<string, unknown>>(props: Props<TContext>): JSX.Element {
  const { className, columns: propsColumns, ...rootTableProps } = props

  const { explorer, onPathChange, paths } = useContext()

  const columns = propsColumns as unknown as Column<Item, TContext>[] /* иначе никак */

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header>
        <Table.Row>
          {columns.map((column, i) => {
            return (
              <Table.ColumnHeaderCell key={i} {...column.headerProps}>
                {React.createElement(column.renderHeader, {
                  accessorKey: column.accessorKey,
                  name: column.name,
                  context: {} as TContext,
                })}
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {explorer?.items.map((item, i) => {
          return (
            <Table.Row
              key={i}
              onClick={() => {
                onPathChange?.([
                  ...(paths || []),
                  { name: item.data[explorer.idKey as (typeof item.data)[keyof typeof item.data]], type: item.type },
                ])
              }}
            >
              {columns.map((column) => {
                return (
                  <Table.Cell key={column.accessorKey} {...column.cellProps}>
                    {React.createElement(column.renderCell, {
                      accessorKey: column.accessorKey,
                      name: column.name,
                      item,
                      context: {} as TContext,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      value: (item.data as any)[column.accessorKey],
                    })}
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

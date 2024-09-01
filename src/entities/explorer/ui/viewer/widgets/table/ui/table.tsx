import { Table } from '@radix-ui/themes'
import { type RootProps } from '@radix-ui/themes/dist/esm/components/table.d.ts'

import { useContext } from 'react'
import React from 'react'

import { type CellProps } from '~/ui/table'
import Text from '~/ui/text'
import { SetterOrUpdater, c } from '~/utils/core'

import { type Item } from '../../../../../types/explorer'
import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'

export type Context = {
  requestParams?: { sort: Record<string, 'asc' | 'desc' | undefined> } | undefined
  setRequestParams?: SetterOrUpdater<{ sort: Record<string, 'asc' | 'desc' | undefined> }> | undefined
}

export interface Column<TDataItem extends Record<string, unknown>> {
  key: keyof TDataItem
  cellProps?: CellProps | undefined
  headerProps?: CellProps | undefined
  context?: Context | undefined
  renderCell: (props: {
    key: keyof TDataItem
    value: TDataItem[keyof TDataItem]
    item: TDataItem
    context?: Context | undefined
  }) => React.ReactNode
  renderHeader: (props: { key: keyof TDataItem; context?: Context | undefined }) => React.ReactNode
}

export type Props = RootProps & {
  className?: string | undefined
  columns: Column<Record<string, unknown>>[]
}

export const NAME = `${ROOT_NAME}-w-Table`

/**
 * explorer-Viewer-w-Table
 */
export default function Component(props: Props): JSX.Element {
  const { className, columns: propsColumns, ...rootTableProps } = props

  const { data, loading, onPathChange, paths, context: contextProp } = useContext(context)

  const columns = propsColumns as unknown as Column<Item>[] /* иначе никак */

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header>
        <Table.Row>
          {columns.map((column, i) => {
            return (
              <Table.ColumnHeaderCell key={i} {...column.headerProps}>
                <Text>
                  {React.createElement(column.renderHeader, {
                    key: column.key,
                    context: contextProp,
                  })}
                </Text>
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.items.map((item, i) => {
          return (
            <Table.Row
              key={i}
              onClick={() => {
                if (loading || isSelected()) return
                onPathChange?.([...(paths || []), { name: item.name, type: item.type }])
              }}
            >
              {columns.map((column, i) => {
                return (
                  <Table.Cell key={i} {...column.cellProps}>
                    {React.createElement(column.renderCell, {
                      key: column.key,
                      item,
                      context: contextProp,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      value: (item.data as any)[column.key],
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

  /**
   * Private
   */

  function isSelected() {
    try {
      const selection = window.getSelection() as Selection
      const selRange = selection?.getRangeAt(0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const text = (selRange.startContainer as any).data as string
      const start = selRange.startOffset
      const end = selRange.endOffset
      return Boolean(text.substring(start, end))
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

Component.displayName = NAME

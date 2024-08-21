import { Table } from '@radix-ui/themes'
import { type RootProps } from '@radix-ui/themes/dist/esm/components/table.d.ts'
import { useContext } from 'react'
import React from 'react'
import { type Item } from '../../../../../types/explorer'
import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'
import { type TableListColumn } from '~/ui/table'
import { c } from '~/utils/core'

export type Props = RootProps & {
  className?: string | undefined
  columns: TableListColumn<Record<string, unknown>>[]
}

export const NAME = `${ROOT_NAME}-w-Table`

/**
 * explorer-Viewer-w-Table
 */
export default function Component(props: Props): JSX.Element {
  const { className, columns: propsColumns, ...rootTableProps } = props

  const { data, loading, onPathChange, paths } = useContext(context)

  const columns = propsColumns as unknown as TableListColumn<Item>[] /* иначе никак */

  return (
    <Table.Root className={c(className, NAME)} {...rootTableProps}>
      <Table.Header>
        <Table.Row>
          {columns.map((column, i) => {
            return (
              <Table.ColumnHeaderCell key={i} {...column.headerProps}>
                {React.createElement(column.renderHeader, { key: column.key })}
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

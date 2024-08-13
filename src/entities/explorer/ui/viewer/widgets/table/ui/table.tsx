import { Table } from '@radix-ui/themes'
import { useContext } from 'react'
import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

export const NAME = `${ROOT_NAME}-w-Table`

/**
 * explorer-Viewer-w-Table
 */
export default function Component(props: Props): JSX.Element {
  const { className } = props

  const { data, loading, onPathChange, paths } = useContext(context)

  return (
    <Table.Root className={c(className, NAME)}>
      <Table.Header>
        <Table.Row>
          {data?.items[0] &&
            Object.keys(data?.items[0].data).map((key) => {
              return <Table.ColumnHeaderCell key={key}>{key}</Table.ColumnHeaderCell>
            })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.items.map((item) => {
          return (
            <Table.Row
              key={item.name}
              onClick={() => {
                if (loading || isSelected()) return
                onPathChange?.([...(paths || []), { name: item.name, type: item.type }])
              }}
            >
              {Object.values(item.data).map((value, i) => {
                return <Table.Cell key={i}>{String(value)}</Table.Cell>
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
    const selection = window.getSelection() as Selection
    const selRange = selection.getRangeAt(0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = (selRange.startContainer as any).data as string
    const start = selRange.startOffset
    const end = selRange.endOffset
    return Boolean(text.substring(start, end))
  }
}

Component.displayName = NAME

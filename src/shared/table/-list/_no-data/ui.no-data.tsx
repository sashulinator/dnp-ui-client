import Text from '~/shared/text'
import { c } from '~/utils/core'

import * as Table from '../../ui.table'

export interface Props {
  className?: string | undefined
  columnLength: number
}

const NAME = 'table--list-_noData'

export default function Component(props: Props): JSX.Element {
  const { columnLength } = props
  return (
    <Table.Body>
      <Table.Row className={c(NAME, props.className)} style={{ backgroundColor: 'var(--table-row-background-color)' }}>
        <Table.Cell colSpan={columnLength} style={{ textAlign: 'center' }}>
          <Text size='1' style={{ textTransform: 'uppercase', color: 'var(--gray-10)' }}>
            Нет данных
          </Text>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}

Component.displayName = NAME

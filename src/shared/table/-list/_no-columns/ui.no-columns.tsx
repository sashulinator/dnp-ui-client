import Text from '~/shared/text'
import { c } from '~/utils/core'

import * as Table from '../../ui.table'

export interface Props {
  className?: string | undefined
}

const NAME = 'table--list-_noColumns'

export default function Component(props: Props): JSX.Element {
  return (
    <Table.Header>
      <Table.Row className={c(NAME, props.className)} style={{ backgroundColor: 'var(--table-row-background-color)' }}>
        <Table.Cell style={{ textAlign: 'center' }}>
          <Text size='1' style={{ textTransform: 'uppercase', color: 'var(--gray-10)' }}>
            Нет колонок
          </Text>
        </Table.Cell>
      </Table.Row>
    </Table.Header>
  )
}

Component.displayName = NAME

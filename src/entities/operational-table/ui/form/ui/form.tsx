import { memo, useEffect } from 'react'
import Columns from '../widgets/columns'

import Flex from '~/ui/flex'
import { Checkbox, Card, Column, Label, Row, Select, TextField, TextFieldProps, useForm } from '~/ui/form'
import { c } from '~/utils/core'
import { useForceUpdate } from '~/utils/core-hooks'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const displayName = 'operationalTable-Form'

/**
 * operationalTable-Form
 */
export function Component(props: Props): JSX.Element {
  return (
    <Flex className={c(props.className, displayName)} direction='column' width='100%' gap='6'>
      <Card>
        <Column>
          <Row style={{ width: '100%' }}>
            <_KnField variant='soft' name='kn' label='Системное название' rootProps={{ flexBasis: '25%' }} />
            <Flex width='75%' />
          </Row>
          <Row style={{ width: '100%' }}>
            <Checkbox variant='soft' name='nav' label='Отображать в навигационной панели' />
          </Row>
        </Column>
      </Card>

      <Card>
        <Row>
          <Column width='25%'>
            <TextField variant='soft' name='name' label='Название' rootProps={{ width: '100%' }} />
            <Select
              label='Представление по умолчанию'
              name='tableSchema.defaultView'
              defaultValue='table'
              rootProps={{ width: '100%' }}
              options={[
                { value: 'table', display: 'Таблица' },
                { value: 'tree', display: 'Дерево' },
              ]}
            />
          </Column>
          <Flex width='75%' />
        </Row>
      </Card>

      <Card>
        <Column>
          <Row>
            <Column width='25%'>
              <TextField variant='soft' name='tableName' label='Таблица' rootProps={{ width: '100%' }} />
            </Column>
            <Flex width='75%' />
          </Row>
          <Column>
            <Flex direction='column'>
              <Label content='Колонки' />
              <Columns name='tableSchema.items' />
            </Flex>
          </Column>
        </Column>
      </Card>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

/**
 * Private
 */

// Дисейблить если в режиме редактирования
function _KnField(props: TextFieldProps) {
  const form = useForm()
  const update = useForceUpdate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form.subscribe(update, { values: true }), [])
  const state = form.getState()
  const readOnly = Boolean(state.values.createdAt)
  return <TextField readOnly={readOnly} {...props} />
}

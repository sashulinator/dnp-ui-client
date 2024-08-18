import { memo, useEffect } from 'react'
import Columns from '../widgets/columns'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import { Checkbox, Label, Select, TextField, TextFieldProps, useForm } from '~/ui/form'
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
      <Card size='4'>
        <Flex direction='column' gap='4'>
          <Flex direction='row' style={{ width: '100%' }} gap='6'>
            <TextField variant='soft' name='name' label='Название' rootProps={{ flexBasis: '50%' }} />
            <_KnField variant='soft' name='kn' label='Системное название' rootProps={{ flexBasis: '50%' }} />
          </Flex>
          <Flex direction='row' style={{ width: '100%' }} gap='6'>
            <Checkbox variant='soft' name='nav' label='Отображать в навигационной панеле' />
          </Flex>
        </Flex>
      </Card>

      <Card size='4'>
        <Flex direction='column' gap='4'>
          <Flex direction='row' width='100%' gap='6'>
            <TextField variant='soft' name='tableName' label='Название таблицы' rootProps={{ width: '50%' }} />
            <Flex width='50%'>
              <Select
                label='Представление по умолчанию'
                name='tableSchema.defaultView'
                defaultValue='table'
                rootProps={{ width: '50%' }}
                options={[
                  { value: 'table', display: 'Таблица' },
                  { value: 'tree', display: 'Дерево' },
                ]}
              />
            </Flex>
          </Flex>
          <Flex direction='column'>
            <Label content='Колонки' />
            <Columns name='tableSchema.items' />
          </Flex>
        </Flex>
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

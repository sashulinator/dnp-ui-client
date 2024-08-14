import { memo } from 'react'
import Flex from '~/ui/flex'

import { Values } from '../types/values'
import Card from '~/ui/card'
import { Checkbox, JsonEditor, TextField, useForm } from '~/ui/form'
import { assertNotEmpty } from '~/utils/assertions'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const displayName = 'operationalTable-Form'

/**
 * operationalTable-Form
 */
export function Component(props: Props): JSX.Element {
  const form = useForm<Values, Values>()
  const state = form.getState()
  const { readonly = false } = props

  const isCreated = Boolean(state.values.createdAt)

  return (
    <Flex className={c(props.className, displayName)} direction='column' width='100%' gap='6'>
      <Card size='4'>
        <Flex direction='column' gap='4'>
          <Flex direction='row' style={{ width: '100%' }} gap='6'>
            <TextField name='name' label='Название' validate={assertNotEmpty} rootProps={{ flexBasis: '50%' }} />
            <TextField
              readOnly={readonly}
              disabled={isCreated}
              name='kn'
              label='Системное название'
              validate={assertNotEmpty}
              rootProps={{ flexBasis: '50%' }}
            />
          </Flex>
          <Flex direction='row' style={{ width: '100%' }} gap='6'>
            <Checkbox name='nav' label='Отображать в навигационной панеле' />
          </Flex>
        </Flex>
      </Card>

      <Card size='4'>
        <Flex direction='column' gap='4'>
          <Flex direction='row' width='100%' gap='6'>
            <TextField
              name='tableName'
              label='Название таблицы'
              validate={assertNotEmpty}
              rootProps={{ flexBasis: '50%' }}
            />
            <Flex flexBasis='50%' />
          </Flex>
          <Flex direction='row' width='100%' gap='6'>
            <JsonEditor readOnly={readonly} name='tableSchema' label='Схема таблицы' />
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

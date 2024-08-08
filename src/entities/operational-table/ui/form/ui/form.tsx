import { memo } from 'react'
import Flex from '~/ui/flex'

import { Values } from '../types/values'
import { Checkbox, TextField, useForm } from '~/ui/form'
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
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <TextField name='name' label='Название' validate={assertNotEmpty} />
      <TextField
        readOnly={readonly}
        disabled={isCreated}
        name='kn'
        label='Системное название'
        validate={assertNotEmpty}
      />
      <TextField name='tableName' label='Название таблицы' validate={assertNotEmpty} />
      <TextField readOnly={readonly} name='tableSchemaKn' label='Схема таблицы' validate={assertNotEmpty} />
      <Checkbox name='nav' label='Отображать в навигационной панеле' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

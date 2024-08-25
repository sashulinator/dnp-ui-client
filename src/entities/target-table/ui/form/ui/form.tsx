import { memo } from 'react'
import { Values } from '../types/values'
import Flex from '~/ui/flex'
import { Checkbox, Field, TextField, useForm } from '~/ui/form'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const displayName = 'targetTable-Form'

/**
 * targetTable-Form
 */
export function Component(props: Props): JSX.Element {
  const form = useForm<Values, Values>()
  const state = form.getState()
  const { readonly = false } = props

  const isCreated = Boolean(state.values.createdAt)

  return (
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <Field component={TextField} name='name' label='Название' />
      <Field component={TextField} readOnly={readonly} disabled={isCreated} name='kn' label='Системное название' />
      <Field component={TextField} name='tableName' label='Название таблицы' />
      <Field component={TextField} readOnly={readonly} name='tableSchemaKn' label='Схема таблицы' />
      <Checkbox name='nav' label='Отображать в навигационной панеле' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

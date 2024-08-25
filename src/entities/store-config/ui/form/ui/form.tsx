import { memo } from 'react'
import Flex from '~/ui/flex'
import { Field, TextField, useForm } from '~/ui/form'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const displayName = 'storeConfig-Form'

/**
 * storeConfig-Form
 */
export function Component(props: Props): JSX.Element {
  const form = useForm()
  const state = form.getState()
  const { readonly = false } = props

  const isCreated = state.values.createdAt

  return (
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <Field component={TextField} readOnly={readonly} disabled={isCreated} name='kn' label='Название' />
      <Field component={TextField} readOnly={readonly} name='data.host' label='Хост' />
      <Field component={TextField} readOnly={readonly} type='number' name='data.port' label='Порт' />
      <Field component={TextField} readOnly={readonly} name='data.username' label='Пользователь' />
      <Field component={TextField} readOnly={readonly} name='data.password' label='Пароль' />
      <Field component={TextField} readOnly={readonly} name='data.dbName' label='База данных' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

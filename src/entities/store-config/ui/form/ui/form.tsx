import { memo } from 'react'
import Flex from '~/ui/flex'

import { TextField, useForm } from '~/ui/form'
import { assertNotEmpty } from '~/utils/assertions'
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
      <TextField readOnly={readonly} disabled={isCreated} name='kn' label='Название' validate={assertNotEmpty} />
      <TextField readOnly={readonly} name='data.host' label='Хост' validate={assertNotEmpty} />
      <TextField readOnly={readonly} name='data.port' label='Порт' validate={assertNotEmpty} />
      <TextField readOnly={readonly} name='data.username' label='Пользователь' validate={assertNotEmpty} />
      <TextField readOnly={readonly} name='data.password' label='Пароль' validate={assertNotEmpty} />
      <TextField readOnly={readonly} name='data.database' label='База данных' validate={assertNotEmpty} />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

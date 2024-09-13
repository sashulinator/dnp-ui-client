import { memo } from 'react'

import Flex from '~/shared/flex'
import { TextField, TextFieldProps, TypedField, useForm } from '~/shared/form'
import { c } from '~/utils/core'

import { Values } from '../types/values'

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
      <TypedField<Values, 'kn', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        disabled={isCreated}
        name='kn'
        label='Название'
      />
      <TypedField<Values, 'data.host', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        name='data.host'
        label='Хост'
      />
      <TypedField<Values, 'data.port', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        type='number'
        name='data.port'
        label='Порт'
      />
      <TypedField<Values, 'data.username', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        name='data.username'
        label='Пользователь'
      />
      <TypedField<Values, 'data.password', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        name='data.password'
        label='Пароль'
      />
      <TypedField<Values, 'data.dbName', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        name='data.dbName'
        label='База данных'
      />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

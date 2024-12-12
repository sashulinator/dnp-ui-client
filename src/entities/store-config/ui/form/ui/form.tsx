import { memo } from 'react'

import Flex from '~/shared/flex'
import type { StringFieldProps } from '~/shared/form'
import { StringField, TypedField, useForm } from '~/shared/form'
import { c } from '~/utils/core'

import type { Values } from '../types/values'

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
      <TypedField<Values, 'kn', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        readOnly={readonly}
        disabled={isCreated}
        name='kn'
        label='Название'
      />
      <TypedField<Values, 'data.host', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        readOnly={readonly}
        name='data.host'
        label='Хост'
      />
      <TypedField<Values, 'data.port', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        readOnly={readonly}
        type='number'
        name='data.port'
        label='Порт'
      />
      <TypedField<Values, 'data.username', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        readOnly={readonly}
        name='data.username'
        label='Пользователь'
      />
      <TypedField<Values, 'data.password', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        readOnly={readonly}
        name='data.password'
        label='Пароль'
      />
      <TypedField<Values, 'data.database', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        readOnly={readonly}
        name='data.database'
        label='База данных'
      />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

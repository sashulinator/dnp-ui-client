import { memo } from 'react'

import Flex from '~/shared/flex'
import { JsonEditor, TextField, TextFieldProps, TypedField, useForm } from '~/shared/form'
import { c } from '~/utils/core'

import { Values } from '../types/values'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const displayName = 'normalizationConfig-Form'

/**
 * normalizationConfig-Form
 */
export function Component(props: Props): JSX.Element {
  const form = useForm()
  const state = form.getState()
  const { readonly = false } = props

  return (
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <TypedField<Values, 'name', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        readOnly={readonly}
        disabled={state.values.id}
        name='name'
        label='Название'
      />
      <JsonEditor readOnly={readonly} name='data.executables' label='executables' />
      <JsonEditor readOnly={readonly} name='data.sdk' label='sdk' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

import { memo } from 'react'
import Flex from '~/ui/flex'

import { Checkbox, TextField, useForm } from '~/ui/form'
import { assertNotEmpty } from '~/utils/assertions'
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
  const form = useForm()
  const state = form.getState()
  const { readonly = false } = props

  const isCreated = state.values.createdAt

  return (
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <TextField readOnly={readonly} disabled={isCreated} name='name' label='Название' validate={assertNotEmpty} />
      <TextField
        readOnly={readonly}
        disabled={isCreated}
        name='kn'
        label='Системное название'
        validate={assertNotEmpty}
      />
      <Checkbox name='nav' label='Отображать в навигационной панеле' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

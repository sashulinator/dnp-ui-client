import { memo } from 'react'
import Flex from '~/ui/flex'

import { JsonEditor, TextField, useForm } from '~/ui/form'
import { assertNotEmpty } from '~/utils/assertions'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

export const displayName = 'normalizationConfig-Form'

/**
 * normalizationConfig-Form
 */
export function Component(props: Props): JSX.Element {
  const form = useForm()
  const state = form.getState()

  return (
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <TextField disabled={state.values.id} name='name' label='Название' validate={assertNotEmpty} />
      <JsonEditor name='data.executables' label='executables' />
      <JsonEditor name='data.sdk' label='sdk' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

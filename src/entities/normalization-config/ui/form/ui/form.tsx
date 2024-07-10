import { memo } from 'react'
import Flex from '~/ui/flex'

import { JsonEditor, TextField } from '~/ui/form'
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
  return (
    <Flex className={c(props.className, displayName)} direction='column' style={{ width: '100%' }} gap='4'>
      <TextField name='name' label='Название' validate={assertNotEmpty} />
      <JsonEditor name='data.sdk' label='sdk' />
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

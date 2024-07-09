import { memo } from 'react'
import { TextField } from '~/ui/form'
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
    <div style={{ width: '100%' }} className={c(props.className, displayName)}>
      <TextField name='name' label='Название' />
    </div>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

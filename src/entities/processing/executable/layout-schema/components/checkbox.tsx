import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

export type Props = Components.Checkbox.Props

const NAME = 'dnp-processing-executables-layoutSchema-components-checkbox'

function Component(props: Props): React.ReactNode {
  return <Components.Checkbox.default {...props} />
}

const TextField = memo(Component)
TextField.displayName = NAME
export default TextField

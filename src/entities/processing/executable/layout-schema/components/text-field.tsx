import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useField } from './lib.use-field'

export type Props = Components.TextInputField.Props & UseFieldProps

const NAME = 'dnp-processing-executables-layoutSchema-components-textField'

export default function Component(props: Props): React.ReactNode {
  const fieldProps = useField(props)

  return <Components.TextInputField.default variant='soft' {...props} {...fieldProps} />
}

const TextField = memo(Component)
TextField.displayName = NAME
// export default TextField

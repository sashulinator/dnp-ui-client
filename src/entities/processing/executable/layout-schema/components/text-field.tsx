import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useFieldProps } from './lib.use-field'

export type Props = Components.TextInputField.Props & UseFieldProps<string>

const NAME = 'dnp-processing-executables-layoutSchema-components-textField'

export default function Component(props: Props): React.ReactNode {
  const fieldProps = useFieldProps(props)

  return <Components.TextInputField.default variant='soft' {...(fieldProps as any)} />
}

const TextField = memo(Component)
TextField.displayName = NAME
// export default TextField

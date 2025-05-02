import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useFieldProps } from './lib.use-field'

// eslint-disable-next-line react-refresh/only-export-components
export const binding = Components.TextField.bindings

export type Props = Components.TextField.Props & UseFieldProps<string>

const NAME = 'dnp-processing-executables-layoutSchema-components-textField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useFieldProps(props)

  return <Components.TextField.default variant='soft' {...(fieldProps as any)} />
}

const TextField = memo(Component)
TextField.displayName = NAME
export default TextField

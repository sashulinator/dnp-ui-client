import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useFieldProps } from './lib.use-field'

// eslint-disable-next-line react-refresh/only-export-components
export const binding = Components.SelectField.bindings

export type Props = Components.SelectField.Props & UseFieldProps<string>

const NAME = 'dnp-processing-executables-layoutSchema-components-selectField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useFieldProps(props)

  return <Components.SelectField.default variant='soft' {...(fieldProps as any)} />
}

const SelectField = memo(Component)
SelectField.displayName = NAME
export default SelectField

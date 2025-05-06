import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useFieldProps } from './lib.use-field'

// eslint-disable-next-line react-refresh/only-export-components
export const bindings = Components.CheckboxField.bindings

export type Props = Components.CheckboxField.Props & UseFieldProps<string>

const NAME = 'dnp-processing-executables-layoutSchema-components-checkboxField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useFieldProps(props)

  return <Components.CheckboxField.default variant='soft' {...(fieldProps as any)} />
}

const CheckboxField = memo(Component)
CheckboxField.displayName = NAME
export default CheckboxField

import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useFieldProps } from './lib.use-field'

// eslint-disable-next-line react-refresh/only-export-components
export const bindings = Components.NumberField.bindings

export type Props = Components.NumberField.Props & UseFieldProps<number>

const NAME = 'dnp-processing-executables-layoutSchema-components-numberField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useFieldProps(props)

  return <Components.NumberField.default {...(fieldProps as any)} />
}

const NumberField = memo(Component)
NumberField.displayName = NAME
export default NumberField

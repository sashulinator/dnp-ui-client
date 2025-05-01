import { memo } from 'react'

import { Components } from '~/slices/layout-schema'

import { type UseFieldProps, useFieldProps } from './lib.use-field'

export type Props = Components.NumberInputField.Props & UseFieldProps<number>

const NAME = 'dnp-processing-executables-layoutSchema-components-numberField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useFieldProps(props)

  return <Components.NumberInputField.default {...(fieldProps as any)} />
}

const NumberField = memo(Component)
NumberField.displayName = NAME
export default NumberField

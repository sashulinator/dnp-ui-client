import { memo } from 'react'

import { Components } from '~/slices/schema-factory'

import { type UseFieldProps, useField } from './lib.use-field'

export type Props = Components.NumberInputField.Props & UseFieldProps

const NAME = 'dnp-processing-executables-layoutSchema-components-numberField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useField(props)

  return <Components.NumberInputField.default {...props} {...fieldProps} />
}

const NumberField = memo(Component)
NumberField.displayName = NAME
export default NumberField

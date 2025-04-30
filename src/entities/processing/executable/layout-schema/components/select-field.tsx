import { memo } from 'react'

import { Components } from '~/slices/schema-factory'

import { type UseFieldProps, useField } from './lib.use-field'

export type Props = Components.SelectField.Props & UseFieldProps

const NAME = 'dnp-processing-executables-layoutSchema-components-selectField'

function Component(props: Props): React.ReactNode {
  const fieldProps = useField(props)

  return <Components.SelectField.default variant='soft' {...props} {...fieldProps} />
}

const SelectField = memo(Component)
SelectField.displayName = NAME
export default SelectField

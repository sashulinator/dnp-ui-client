import { memo } from 'react'

import { Components } from '~/slices/schema-factory'

export type Props = Components.Checkbox.Props & {
  context: { isSingleMode: boolean; isEditing: boolean }
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
}

const NAME = 'dnp-processing-executables-layoutSchema-components-checkbox'

function Component(props: Props): React.ReactNode {
  const { isSingleModeDisabled, disabled, isMultiModeDisabled, context, ...restProps } = props

  const isSingleDisabled = isSingleModeDisabled && context.isSingleMode
  const multiModeDisabled = isMultiModeDisabled && !context.isSingleMode
  const isDisabled = disabled || isSingleDisabled || multiModeDisabled

  return <Components.Checkbox.default {...restProps} context={context} disabled={isDisabled} />
}

const TextField = memo(Component)
TextField.displayName = NAME
export default TextField

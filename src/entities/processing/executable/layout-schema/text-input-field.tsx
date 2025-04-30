import { memo } from 'react'

import { Components } from '~/slices/schema-factory'

export type Props = Components.TextInputField.Props & {
  context: { isSingleMode: boolean; isEditing: boolean }
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
}

const NAME = 'dnp-processing-executables-layoutSchema-textInputField'

export const TextInputField = memo((props: Props): React.ReactNode => {
  const { isSingleModeDisabled, disabled, isMultiModeDisabled, context, ...restProps } = props

  const isSingleDisabled = isSingleModeDisabled && context.isSingleMode
  const multiModeDisabled = isMultiModeDisabled && !context.isSingleMode
  const isDisabled = disabled || isSingleDisabled || multiModeDisabled

  return (
    <Components.TextInputField.default
      {...restProps}
      placeholder={
        isSingleDisabled ? 'Только массовая настройка' : multiModeDisabled ? 'Только потабличная настройка' : undefined
      }
      context={context}
      disabled={isDisabled}
      fieldName={`${(props.context as any).parentFieldName}.${props.fieldName}`}
    />
  )
})

TextInputField.displayName = NAME

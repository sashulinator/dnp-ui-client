import { memo } from 'react'

import { TextInputField as SliceTextInputField } from '~/slices/schema-factory'

export type Props = SliceTextInputField.Props & {
  context: { isSingleMode: boolean }
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
}

const NAME = 'dnp-layoutSchema-textInputField'

export const TextInputField = memo((props: Props): React.ReactNode => {
  const { isSingleModeDisabled, disabled, isMultiModeDisabled, context, ...restProps } = props

  const isSingleDisabled = isSingleModeDisabled && context.isSingleMode
  const multiModeDisabled = isMultiModeDisabled && !context.isSingleMode
  const isDisabled = disabled || isSingleDisabled || multiModeDisabled

  return (
    <SliceTextInputField.TextInputField
      {...restProps}
      placeholder={
        isSingleDisabled ? 'Только потабличная настройка' : multiModeDisabled ? 'Только массовая настройка' : undefined
      }
      context={context}
      disabled={isDisabled}
      fieldName={`${(props.context as any).parentFieldName}.${props.fieldName}`}
    />
  )
})

TextInputField.displayName = NAME

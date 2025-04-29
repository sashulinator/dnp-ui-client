import { memo } from 'react'

import { Components } from '~/slices/schema-factory'
import { type Any } from '~/utils/core'

export type Props = Components.SelectField.Props & {
  context: { isSingleMode: boolean; parentFieldName: string }
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
}

const NAME = 'dnp-processing-executables-layoutSchema-selectField'

export const SelectField = memo((props: Props): React.ReactNode => {
  const { isSingleModeDisabled, disabled, isMultiModeDisabled, context, ...restProps } = props

  const isSingleDisabled = isSingleModeDisabled && context.isSingleMode
  const multiModeDisabled = isMultiModeDisabled && !context.isSingleMode
  const isDisabled = disabled || isSingleDisabled || multiModeDisabled

  return (
    <Components.SelectField.default
      {...restProps}
      variant='surface'
      placeholder={
        isSingleDisabled
          ? 'Только массовая настройка'
          : multiModeDisabled
            ? 'Только потабличная настройка'
            : (undefined as Any)
      }
      context={context}
      disabled={isDisabled}
      fieldName={`${props.context?.parentFieldName}.${props.fieldName}`}
    />
  )
})

SelectField.displayName = NAME

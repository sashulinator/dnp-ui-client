import { type Context } from '../types'

export type UseFieldProps = Context & {
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
  disabled?: boolean | undefined
  fieldName: string
}

export function useField(props: UseFieldProps) {
  const { isSingleModeDisabled, disabled, fieldName, isMultiModeDisabled, context } = props

  const isSingleDisabled = isSingleModeDisabled && context.isSingleMode
  const multiModeDisabled = isMultiModeDisabled && !context.isSingleMode
  const isDisabled = disabled || isSingleDisabled || multiModeDisabled

  const retFieldName = context.parentFieldName ? `${context.parentFieldName}.${fieldName}` : fieldName

  const placeholder = isSingleDisabled
    ? 'Только массовая настройка'
    : multiModeDisabled
      ? 'Только потабличная настройка'
      : ''

  return { disabled: isDisabled, placeholder, fieldName: retFieldName }
}

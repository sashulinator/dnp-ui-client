import { FieldInputProps, FieldMetaState } from 'react-final-form'

export function _checkErrorVisible<FieldValue, Element extends HTMLElement>(params: {
  input: FieldInputProps<string, Element>
  meta: FieldMetaState<FieldValue>
}) {
  return (params.meta.error || params.meta.submitError) && params.meta.touched
}

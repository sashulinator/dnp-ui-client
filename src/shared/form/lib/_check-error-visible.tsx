import { type FieldInputProps, type FieldMetaState } from 'react-final-form'

export function _checkErrorVisible<FieldValue, Element extends HTMLElement>(params: {
  input: FieldInputProps<FieldValue, Element>
  meta: FieldMetaState<FieldValue>
}) {
  return (params.meta.error || params.meta.submitError) && params.meta.touched
}

import { FieldInputProps, FieldMetaState } from 'react-final-form'

import Hint from '../ui/hint'

export function _renderHint<FieldValue, Element extends HTMLElement>(params: {
  input: FieldInputProps<string, Element>
  meta: FieldMetaState<FieldValue>
  isErrorVisible: boolean
}) {
  return params.isErrorVisible ? (
    <Hint type='error' content={params.meta.error.message || params.meta.submitError.message} />
  ) : undefined
}

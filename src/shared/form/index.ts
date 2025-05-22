/**
 * ui
 */
import { default as Form } from './ui.form'

export default Form
export type { Props as FormProps } from './ui.form'

/**
 * lib
 */
export { useCreateForm } from './lib/use-create-form'
export { toNestedErrors } from './lib/to-nested-errors'

/**
 * reexports
 */
export {
  type ReactContext,
  type FieldMetaState,
  type FieldInputProps,
  type FieldRenderProps,
  type UseFieldConfig,
  useForm,
  useField,
} from 'react-final-form'

export { type FormSubscription, type FormApi, getIn, setIn } from 'final-form'

export { default as arrayMutators, type Mutators } from 'final-form-arrays'
export { type FieldArrayRenderProps, type RenderableProps, FieldArray } from 'react-final-form-arrays'

/**
 * widgets
 */

// checkbox
export { default as KeyValue, type KeyValueProps } from './key-value'
export { default as Row, type RowProps } from './row'
export { default as Card, type CardProps } from './card'
export * as Field from './field'
export { default as Column, type ColumnProps } from './column'
export { default as Hint, type HintProps } from './hint'

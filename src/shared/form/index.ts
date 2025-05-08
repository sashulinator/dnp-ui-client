/**
 * ui
 */
import { default as Form } from './ui/form'

export default Form
export type { Props as FormProps } from './ui/form'

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
export { default as TextArea, type TextAreaProps } from './ui/text-area'
export { default as KeyValue, type KeyValueProps } from './ui/key-value'
export { default as Label, type LabelProps } from './ui/label'
export { default as JsonEditor, type JsonEditorProps } from './ui/json-editor'
export { default as Row, type RowProps } from './ui/row'
export { default as Card, type CardProps } from './ui/card'
export { default as Field, type FieldProps } from './ui/field'
export { default as Column, type ColumnProps } from './ui/column'
export { default as Hint, type HintProps } from './ui/hint'
export { default as TypedField, type TypedFieldProps } from './ui/typed-field'

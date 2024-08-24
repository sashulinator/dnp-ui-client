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
  Field,
} from 'react-final-form'

export { type FormSubscription, type FormApi, getIn, setIn } from 'final-form'

export { default as arrayMutators, type Mutators } from 'final-form-arrays'
export { type FieldArrayRenderProps, type RenderableProps, FieldArray } from 'react-final-form-arrays'

/**
 * widgets
 */
export { default as TextField, type TextFieldProps } from './widgets/text-field'
export { default as KeyValue, type KeyValueProps } from './widgets/key-value'
export { default as TagPicker, type TagPickerProps } from './widgets/tag-picker'
export { default as Checkbox, type CheckboxProps } from './widgets/checkbox'
export { default as Label, type LabelProps } from './widgets/label'
export { default as Select, type SelectProps } from './widgets/select'
export { default as CodeEditor, type CodeEditorProps } from './widgets/code-editor'
export { default as JsonEditor, type JsonEditorProps } from './widgets/json-editor'
export { default as Row, type RowProps } from './widgets/row'
export { default as Card, type CardProps } from './widgets/card'
export { default as Column, type ColumnProps } from './widgets/column'
export { default as Hint, type HintProps } from './widgets/hint'

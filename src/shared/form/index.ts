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
} from 'react-final-form'

export { type FormSubscription, type FormApi, getIn, setIn } from 'final-form'

export { default as arrayMutators, type Mutators } from 'final-form-arrays'
export { type FieldArrayRenderProps, type RenderableProps, FieldArray } from 'react-final-form-arrays'

/**
 * widgets
 */

// checkbox
export { default as Checkbox, type CheckboxProps } from './ui/checkbox'
export { default as TreeCheckbox, type TreeCheckboxProps } from './ui/tree-checkbox'
export { default as LabeledCheckbox, type LabeledCheckboxProps } from './ui/labeled-checkbox'

export { default as TextField, type TextFieldProps, UniqueTextField, type UniqueTextFieldProps } from './ui/text-field'
export { default as TextArea, type TextAreaProps } from './ui/text-area'
export { default as KeyValue, type KeyValueProps } from './ui/key-value'
export { default as TagPicker, type TagPickerProps } from './ui/tag-picker'
export { default as Label, type LabelProps } from './ui/label'
export { default as Select, type SelectProps } from './ui/select'
export { default as CodeEditor, type CodeEditorProps } from './ui/code-editor'
export { default as JsonEditor, type JsonEditorProps } from './ui/json-editor'
export { default as Row, type RowProps } from './ui/row'
export { default as Card, type CardProps } from './ui/card'
export { default as Field, type FieldProps } from './ui/field'
export { default as Column, type ColumnProps } from './ui/column'
export { default as Hint, type HintProps } from './ui/hint'
export { default as TypedField, type TypedFieldProps } from './ui/typed-field'

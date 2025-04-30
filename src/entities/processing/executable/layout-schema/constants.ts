import { componentMap as sliceComponentMap } from '~/slices/schema-factory'

import { ColumnSelectField } from './column-select-field'
import { NumberInputField } from './number-input-field'
import { SelectField } from './select-field'
import { TextInputField } from './text-input-field'

export const componentMap = {
  ...sliceComponentMap,
  TextField: {
    render: TextInputField,
  },
  NumberField: {
    render: NumberInputField,
  },
  SelectField: {
    render: SelectField,
  },
  ColumnSelectField: {
    render: ColumnSelectField,
  },
}

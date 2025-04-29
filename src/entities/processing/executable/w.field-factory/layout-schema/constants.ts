import { componentMap as sliceComponentMap } from '~/slices/schema-factory'

import { NumberInputField } from './number-input-field'
import { TextInputField } from './text-input-field'

export const componentMap = {
  ...sliceComponentMap,
  TextField: {
    render: TextInputField,
  },
  NumberField: {
    render: NumberInputField,
  },
}

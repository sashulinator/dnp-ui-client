import { componentMap as sliceComponentMap } from '~/slices/schema-factory'

import { TextInputField } from './text-input-field'

export const componentMap = {
  ...sliceComponentMap,
  TextField: {
    render: TextInputField,
  },
}

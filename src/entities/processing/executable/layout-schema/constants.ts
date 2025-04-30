import { componentMap as sliceComponentMap } from '~/slices/schema-factory'

import * as Components from './components'

export const componentMap = {
  ...sliceComponentMap,
  TextField: {
    render: Components.TextField.default,
  },
  NumberField: {
    render: Components.NumberField.default,
  },
  SelectField: {
    render: Components.SelectField.default,
  },
  ColumnSelectField: {
    render: Components.ColumnSelectField.default,
  },
  Checkbox: {
    render: Components.Checkbox.default,
  },
}

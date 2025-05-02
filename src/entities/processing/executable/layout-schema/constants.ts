import { type ComponentWithMeta, componentMap as sliceComponentMap } from '~/slices/layout-schema'
import type { Dictionary } from '~/utils/core'

import * as Components from './components'

export const componentMap = {
  ...sliceComponentMap,
  TextField: {
    render: Components.TextField.default,
    bindings: sliceComponentMap.TextField.bindings,
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
  DcservicePickerField: {
    render: Components.DcservicePickerField.default,
  },
} satisfies Dictionary<ComponentWithMeta>

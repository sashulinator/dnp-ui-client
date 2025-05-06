import { type ComponentWithMeta, componentMap as sliceComponentMap } from '~/slices/layout-schema'
import type { Dictionary } from '~/utils/core'

import * as Components from './components'

export const componentMap = {
  ...sliceComponentMap,
  Checkbox: {
    render: Components.Checkbox.default,
  },
  CheckboxField: {
    render: Components.CheckboxField.default,
    bindings: Components.CheckboxField.bindings,
  },
  TextField: {
    render: Components.TextField.default,
    bindings: Components.TextField.bindings,
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
  DcservicePickerField: {
    bindings: Components.DcservicePickerField.binding,
    render: Components.DcservicePickerField.default,
  },
} satisfies Dictionary<ComponentWithMeta>

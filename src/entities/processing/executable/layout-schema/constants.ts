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
    bindings: Components.NumberField.bindings,
    render: Components.NumberField.default,
  },
  SelectField: {
    bindings: Components.SelectField.bindings,
    render: Components.SelectField.default,
  },
  ColumnSelectField: {
    bindings: Components.ColumnSelectField.bindings,
    render: Components.ColumnSelectField.default,
  },
  DcservicePickerField: {
    bindings: Components.DcservicePickerField.binding,
    render: Components.DcservicePickerField.default,
  },
} satisfies Dictionary<ComponentWithMeta>

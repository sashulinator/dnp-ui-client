import type { Dictionary } from '~/utils/core'

import * as Button from './components/button'
import * as Column from './components/column'
import * as Flex from './components/flex'
import * as NumberField from './components/number-field'
import * as Root from './components/root'
import * as Row from './components/row'
import * as SelectField from './components/select-field'
import * as TextField from './components/text-field'
import type { ComponentWithMeta } from './types'

export const componentMap = {
  Root: {
    render: Root.default,
  },
  Flex: {
    render: Flex.default,
  },
  Column: {
    render: Column.default,
  },
  Row: {
    render: Row.default,
  },
  Button: {
    render: Button.default,
  },
  TextField: {
    render: TextField.default,
    bindings: TextField.bindings,
  },
  NumberField: {
    render: NumberField.default,
    bindings: NumberField.bindings,
  },
  SelectField: {
    render: SelectField.default,
    bindings: SelectField.bindings,
  },
} satisfies Dictionary<ComponentWithMeta>

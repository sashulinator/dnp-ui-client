import type { Dictionary } from '~/utils/core'

import { Button } from './components/button'
import Flex from './components/flex'
import SelectField from './components/select-field'
import * as TextInputField from './components/text-field'
import { Root } from './root'
import type { ComponentWithMeta } from './types'

export const componentMap = {
  Root: {
    render: Root,
  },
  Button: {
    render: Button,
  },
  TextField: {
    render: TextInputField.default,
    bindings: TextInputField.bindings,
  },
  Flex: {
    render: Flex,
  },
  SelectField: {
    render: SelectField,
  },
} satisfies Dictionary<ComponentWithMeta>

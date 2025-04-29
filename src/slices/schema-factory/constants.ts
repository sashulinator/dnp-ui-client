import { Button } from './components/button'
import { Flex } from './components/flex'
import SelectField from './components/select-field'
import TextInputField from './components/text-input-field'
import { Root } from './root'

export const componentMap = {
  Root: {
    render: Root,
  },
  Button: {
    render: Button,
  },
  TextField: {
    render: TextInputField,
  },
  Flex: {
    render: Flex,
  },
  SelectField: {
    render: SelectField,
  },
}

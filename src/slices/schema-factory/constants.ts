import { Button } from './components/button'
import { Flex } from './components/flex'
import { Root } from './root'
import TextInputField from './components/text-input-field'

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
}

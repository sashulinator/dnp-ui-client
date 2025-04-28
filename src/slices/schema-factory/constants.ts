import { Button } from './button'
import { Flex } from './flex'
import { Root } from './root'
import { TextInputField } from './text-input-field'

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

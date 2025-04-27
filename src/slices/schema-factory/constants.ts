import { Button } from './button'
import { Flex } from './flex'
import { Root } from './root'
import { TextInput } from './text-input'

export const componentMap = {
  Root: {
    render: Root,
  },
  Button: {
    render: Button,
  },
  TextField: {
    render: TextInput,
  },
  Flex: {
    render: Flex,
  },
}

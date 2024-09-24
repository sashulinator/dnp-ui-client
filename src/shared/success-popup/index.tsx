import { Dialog, Flex, Text } from '@radix-ui/themes'
import Button from '../button'

interface Props {
  open: boolean
  title?: string
  description: string
  onClose: () => void
}

export const SuccessPopup = ({ open, title = 'Успешно', description, onClose }: Props) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>{title}</Dialog.Title>
        <Flex pt='12'>
          <Text>{description}</Text>
        </Flex>
        <Flex mt='4' justify='end'>
          <Button onClick={onClose}>Закрыть</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

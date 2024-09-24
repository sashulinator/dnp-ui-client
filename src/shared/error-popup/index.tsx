import Button from '../button'
import Dialog from '../dialog'
import Flex from '../flex'
import Text from '../text'

interface Props {
  open: boolean
  title?: string
  description: string
  onClose: () => void
}

export const ErrorPopup = ({ open, title = 'Ошибка', description, onClose }: Props) => {
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

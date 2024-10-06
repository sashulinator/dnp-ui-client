import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Text from '~/shared/text'

import Dialog from '../../dialog'

export interface Props {
  open: boolean
  title?: string
  description: string
  onClose: () => void
  onConfirm: () => void
}

Component.displayname = 'dialog-Confirm'

export default function Component(props: Props) {
  const { open, title = 'Успешно', description, onConfirm, onClose } = props

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px' minWidth='250px'>
        <Flex gap='6' direction='column'>
          <Flex direction='column'>
            <Dialog.Title>{title}</Dialog.Title>
            <Text>{description}</Text>
          </Flex>
          <Flex justify='end' gap='4'>
            <Button onClick={onClose}>Закрыть</Button>
            <Button onClick={onConfirm}>Ок</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

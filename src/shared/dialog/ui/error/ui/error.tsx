import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import Text from '~dnp/shared/text'

import Dialog from '../../dialog'

export interface Props {
  open: boolean
  title?: string
  description: string
  onClose: () => void
}

Component.displayname = 'dialog-Error'

export default function Component(props: Props) {
  const { open, title = 'Ошибка', description, onClose } = props
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

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Text from '~/shared/text'

import Dialog from '../../dialog'

export interface Props {
  open: boolean
  title?: string
  description: string
  onClose: () => void
}

Component.displayname = 'dialog-Success'

export default function Component(props: Props) {
  const { open, title = 'Успешно', description, onClose } = props

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

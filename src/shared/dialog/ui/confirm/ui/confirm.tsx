import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { type Controller } from '~/shared/store'
import Text from '~/shared/text'
import { useSubscribeUpdate } from '~/utils/core-hooks'

import Dialog from '../../dialog'

export interface Props {
  isOpenController: Controller<boolean>
  title?: string
  description: string
  onClose: () => void
  onConfirm: () => void
}

Component.displayname = 'dialog-Confirm'

export default function Component(props: Props) {
  const { isOpenController, title = 'Вы уверены?', description, onConfirm, onClose } = props

  const isOpen = isOpenController.get()

  useSubscribeUpdate(subscribes)

  return (
    <Dialog.Root open={isOpen}>
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

  /**
   * private
   */

  function subscribes(update: () => void) {
    return [isOpenController.subscribe(update)]
  }
}

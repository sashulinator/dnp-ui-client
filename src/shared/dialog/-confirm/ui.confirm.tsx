import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { fns } from '~/utils/core'

export interface Props {
  open: boolean
  title: string
  description?: string | undefined
  confirmText?: string
  closeText?: string
  onClose?: (() => void) | undefined
  onConfirm: () => void | Promise<void>
}

Component.displayname = 'ui-dialog--confirm'

export default function Component(props: Props) {
  const { open, title, description, onClose, onConfirm, closeText = 'Отмена', confirmText = ' Подтвердить' } = props

  return (
    <Dialog.Root open={open} onOpenChange={fns(onClose)}>
      <Dialog.Content maxWidth='450px' minWidth='250px'>
        <Flex gap='6' direction='column'>
          <Flex direction='column'>
            <Dialog.Title>{title}</Dialog.Title>
            {description && <Text>{description}</Text>}
          </Flex>
          <Flex justify='end' gap='4'>
            <Button variant='outline' onClick={fns(onClose)}>
              {closeText}
            </Button>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

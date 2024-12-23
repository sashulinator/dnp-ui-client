import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { type Atom } from '~/utils/store'

import Dialog from '../../dialog'

export interface BaseProps {
  open: boolean
  title: string
  confirmText?: string
  closeText?: string
  description: string
  onClose: () => void
  onConfirm: () => void
}

export type Props<T extends Partial<BaseProps>> = {
  controller: Atom<T>
} & Omit<BaseProps, keyof T>

Component.displayname = 'dialog-Confirm'

export default function Component<T extends Partial<BaseProps>>(props: Props<T>) {
  const { controller, ...baseProps } = props
  const controllerProps = controller?.get()
  const {
    open,
    title,
    description,
    onClose,
    onConfirm,
    closeText = 'Закрыть',
    confirmText = 'Ок',
  } = { ...baseProps, ...controllerProps } as BaseProps

  useSubscribeUpdate(subscribes)

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px' minWidth='250px'>
        <Flex gap='6' direction='column'>
          <Flex direction='column'>
            <Dialog.Title>{title}</Dialog.Title>
            <Text>{description}</Text>
          </Flex>
          <Flex justify='end' gap='4'>
            <Button onClick={onClose}>{closeText}</Button>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )

  /**
   * private
   */

  function subscribes(update: () => void) {
    if (!controller) return []
    return [controller.subscribe(update)]
  }
}

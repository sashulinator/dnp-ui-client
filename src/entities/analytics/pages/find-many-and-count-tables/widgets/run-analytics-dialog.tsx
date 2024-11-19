import { type api } from '~/entities/analytics/api'
import Button from '~/shared/button'
import { type Controller } from '~/shared/controller'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'

type AnalyticsTable = api.findManyAndCountTables.ResponseData['items'][number]

export interface Props {
  dialogController: Controller<boolean>
  selectedItemsController: Controller<Dictionary<AnalyticsTable>>
}

const NAME = 'workingTable-SelectedItemsDialog'

export default function Component(props: Props): JSX.Element {
  const { dialogController, selectedItemsController } = props

  useSubscribeUpdate(dialogController.subscribe)
  useSubscribeUpdate(selectedItemsController.subscribe)

  const open = dialogController.get()

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='1224px'>
        <Dialog.Title>
          <Flex gap='1' align='center' justify='between'>
            Запуск аналитики{' '}
            <Button round={true} variant='ghost' onClick={() => dialogController.set(false)}>
              <Icon name='Cross1' />
            </Button>
          </Flex>
        </Dialog.Title>
      </Dialog.Content>
    </Dialog.Root>
  )
}

Component.displayName = NAME

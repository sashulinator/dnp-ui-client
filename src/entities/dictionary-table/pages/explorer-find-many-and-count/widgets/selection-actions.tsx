import Button from '~dnp/shared/button'
import { RenderCounter } from '~dnp/shared/debug'
import Flex, { type FlexProps } from '~dnp/shared/flex'
import { type Controller } from '~dnp/shared/store'
import { type Dictionary } from '~dnp/utils/core'
import { useSubscribeUpdate } from '~dnp/utils/core-hooks'

export type Props = FlexProps & {
  selectedItemsController: Controller<Dictionary<Dictionary>>
  onCounterClick: (e: React.MouseEvent) => void
  onRemoveClick: (e: React.MouseEvent) => void
}

const NAME = 'workingTable-page-SelectionCount'

export default function Component(props: Props): JSX.Element | null {
  const { selectedItemsController, onRemoveClick, onCounterClick, ...flexProps } = props
  const count = Object.keys(selectedItemsController.get()).length

  useSubscribeUpdate((update) => [selectedItemsController.subscribe(update)])

  if (count === 0) return null

  return (
    <Flex gap='4' {...flexProps}>
      <RenderCounter name='selectionCounter' />
      <Flex width='34px' justify='center' align='center'>
        <Button onClick={onCounterClick} size='1' variant='ghost'>
          {count}
        </Button>
      </Flex>
      <Button onClick={onRemoveClick} variant='ghost' disabled={count === 0}>
        Удалить
      </Button>
    </Flex>
  )
}

Component.displayName = NAME

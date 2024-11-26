import { type FlatTable } from '~/entities/database-container'
import Button from '~/shared/button'
import { type Controller } from '~/shared/controller'
import { RenderCounter } from '~/shared/debug'
import Flex, { type FlexProps } from '~/shared/flex'
import Text from '~/shared/text'
import { type Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'

export type Props = FlexProps & {
  selectedItemsController: Controller<Dictionary<FlatTable>>
  onRunAnalyticsClick: (e: React.MouseEvent) => void
}

const NAME = 'dnp-page-SelectionCount'

export default function Component(props: Props): JSX.Element | null {
  const { selectedItemsController, onRunAnalyticsClick: onRemoveClick, ...flexProps } = props
  const count = Object.keys(selectedItemsController.get()).length

  useSubscribeUpdate((update) => [selectedItemsController.subscribe(update)])

  if (count === 0) return null

  return (
    <Flex gap='4' {...flexProps}>
      <RenderCounter name='selectionCounter' />
      <Flex width='34px' justify='center' align='center'>
        <Text color='gray' size='1'>
          {count}
        </Text>
      </Flex>
      <Button onClick={onRemoveClick} variant='ghost' disabled={count === 0}>
        Запустить аналитику
      </Button>
    </Flex>
  )
}

Component.displayName = NAME

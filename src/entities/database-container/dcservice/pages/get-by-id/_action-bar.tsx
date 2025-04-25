import type { Dcrow } from '~/entities/database-container'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { c } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import type { Atom } from '~/utils/store'

export interface Props {
  className?: string | undefined
  selectedItemsState?: Atom<Record<string, Dcrow.Row>> | undefined
  onRemoveClick: (e: React.MouseEvent) => void
}

const NAME = 'ActionBar'

export default function Component(props: Props): JSX.Element {
  const { selectedItemsState, onRemoveClick } = props
  const selectedItems = selectedItemsState?.get()
  const selectedList = Object.values(selectedItems || {})

  useSubscribeUpdate(selectedItemsState?.subscribe)

  return (
    <Flex width='100%' className={c(props.className, NAME)} p='1'>
      <Button onClick={onRemoveClick} variant='ghost' disabled={!selectedList.length}>
        ({selectedList.length}) Удалить
      </Button>
    </Flex>
  )
}

Component.displayName = NAME

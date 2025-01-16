import { Dctable } from '~/entities/database-container'
import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { type Atom } from '~/utils/store'

export type ListTable = Dctable.ListTable.ListTableProps
export type ListTableItem = Dctable.ListTable.Item

export interface Props extends Dctable.ListTable.ListTableProps {
  openAtom: Atom<boolean>
}

const NAME = 'processing-page-create-TableModal'

export default function Component(props: Props): JSX.Element {
  const { openAtom, ...listTableProps } = props

  useSubscribeUpdate(openAtom.subscribe)

  return (
    <Dialog.Root open={openAtom.get()}>
      <Dialog.Content maxWidth='1224px'>
        <Dialog.Title>
          <Flex gap='1' align='center' justify='between'>
            Выделенные{' '}
            <Button round={true} variant='ghost' onClick={() => openAtom.set(false)}>
              <Icon name='Cross1' />
            </Button>
          </Flex>
        </Dialog.Title>

        <ScrollArea scrollbars='horizontal'>
          <Dctable.ListTable.default {...listTableProps} />
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )
}

Component.displayName = NAME

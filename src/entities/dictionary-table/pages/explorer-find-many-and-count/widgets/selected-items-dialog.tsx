import { useMemo } from 'react'

import { type DictionaryTable } from '~/entities/dictionary-table'
import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { type Controller } from '~/shared/store'
import { Column, ListTable } from '~/shared/table'
import { createActionColumn } from '~/shared/working-table'
import { type Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { remove } from '~/utils/dictionary'

export interface Props {
  dialogController: Controller<boolean>
  selectedItemsController: Controller<Dictionary<Dictionary>>
  dictionaryTable: DictionaryTable | undefined
  idKey: string
}

const NAME = 'workingTable-SelectedItemsDialog'

export default function Component(props: Props): JSX.Element {
  const { dialogController, idKey, dictionaryTable, selectedItemsController } = props

  useSubscribeUpdate(dialogController.subscribe)
  useSubscribeUpdate(selectedItemsController.subscribe)

  const selectedcolumns = selectedItemsController.get()
  const selectedUiColumns = useMemo(buildSelectedUiColumns, [dictionaryTable])
  const open = dialogController.get()

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='1224px'>
        <Dialog.Title>
          <Flex gap='1' align='center' justify='between'>
            Выделенные{' '}
            <Button round={true} variant='ghost' onClick={() => dialogController.set(false)}>
              <Icon name='Cross1' />
            </Button>
          </Flex>
        </Dialog.Title>

        <ScrollArea scrollbars='horizontal'>
          <ListTable context={{}} columns={selectedUiColumns} list={Object.values(selectedcolumns)} />
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )

  /**
   * private
   */

  function buildSelectedUiColumns() {
    if (dictionaryTable?.columns === undefined) return []

    const columns = dictionaryTable.columns.map((column) => Column.fromDatabaseColumn(column))

    const actionsColumn = createActionColumn({
      renderHeader: () => '',
      justify: 'center',
      headerProps: { width: '34px', style: { padding: '0' } },
      cellProps: { width: '34px', style: { padding: '0' } },
      onCrossClick: (_, item) => {
        const columns = selectedItemsController.get()
        selectedItemsController.set(remove(columns, item[idKey] as string))
      },
    })
    return [actionsColumn, ...columns]
  }
}

Component.displayName = NAME

import { Checkbox } from '@radix-ui/themes'

import { type Controller } from '~dnp/shared/store'
import { type ColumnTypes } from '~dnp/shared/table'
import { type Dictionary } from '~dnp/utils/core'
import { useSubscribeUpdate } from '~dnp/utils/core-hooks'
import { remove } from '~dnp/utils/dictionary'
import { toDictionary } from '~dnp/utils/list'

export type Context = {
  idKey: string
  selectedItemsController: Controller<Dictionary<Dictionary>>
}

export function createSelectionColumn<TItem extends Dictionary, TContext extends Context>(): ColumnTypes.Column<
  TItem,
  TContext
> {
  return {
    accessorKey: 'action',
    name: 'Действия',
    renderHeader: ({ context, list }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSubscribeUpdate((update) => [context.selectedItemsController.subscribe(update)])

      const idKey = context.idKey
      const selectedItems = context.selectedItemsController.get()
      const setSelectedItems = context.selectedItemsController.set

      const selectedIds = Object.keys(selectedItems)
      const selectedValues = Object.values(selectedItems)

      const interferedCount = list.reduce((count, item) => {
        if (selectedIds.includes(item[idKey] as string)) count++
        return count
      }, 0)

      const checked = selectedIds.length === 0 ? false : list.length === interferedCount ? true : 'indeterminate'

      return (
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => {
            if (checked === false) {
              const filtered = selectedValues.filter(
                (selectedItem) => !list.find((item) => item[idKey] === selectedItem[idKey]),
              )
              setSelectedItems(toDictionary((item) => item[idKey] as string, filtered) || {})
            } else {
              const dictionary = toDictionary((item) => item[idKey] as string, list) || {}
              if (checked === 'indeterminate') {
                setSelectedItems(dictionary)
              } else {
                setSelectedItems({ ...selectedItems, ...dictionary })
              }
            }
          }}
        />
      )
    },
    cellProps: {
      style: {
        maxWidth: '32px',
        minWidth: '32px',
        width: '32px',
        textAlign: 'center',
        // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
        padding: '0',
        verticalAlign: 'middle',
      },
    },
    headerProps: {
      maxWidth: '32px',
      minWidth: '32px',
      width: '32px',
      style: {
        padding: '0',
        textAlign: 'center',
        verticalAlign: 'middle',
      },
    },
    renderCell: ({ item, context }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSubscribeUpdate((update) => [context.selectedItemsController.subscribe(update)])

      const id = item[context.idKey!] as string
      const selectedItems = context.selectedItemsController.get()
      const setSelectedItems = context.selectedItemsController.set

      const checked = selectedItems[id]
      return (
        <Checkbox
          checked={Boolean(checked)}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedItems({ ...selectedItems, [id]: item })
            } else {
              setSelectedItems(remove(selectedItems, id))
            }
          }}
        />
      )

      /**
       * private
       */
    },
  }
}

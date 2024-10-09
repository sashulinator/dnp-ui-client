import { Checkbox } from '@radix-ui/themes'

import { type ColumnTypes } from '~/shared/table'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'
import { remove } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'

export type Context = {
  idKey: string
  selectedItems: Dictionary<Dictionary>
  setSelectedItems: SetterOrUpdater<Dictionary<Dictionary>>
}

export function createSelectionColumn<TItem extends Dictionary, TContext extends Context>(): ColumnTypes.Column<
  TItem,
  TContext
> {
  return {
    accessorKey: 'action',
    name: 'Действия',
    renderHeader: ({ context, list }) => {
      const idKey = context.idKey
      const selectedIds = Object.keys(context.selectedItems)
      const selectedValues = Object.values(context.selectedItems)

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
              context.setSelectedItems(toDictionary((item) => item[idKey] as string, filtered) || {})
            } else {
              const dictionary = toDictionary((item) => item[idKey] as string, list) || {}
              if (checked === 'indeterminate') {
                context.setSelectedItems(dictionary)
              } else {
                context.setSelectedItems((currentDictionary) => ({ ...currentDictionary, ...dictionary }))
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
      const id = item[context.idKey!] as string
      const checked = context.selectedItems[id]
      return (
        <Checkbox
          checked={Boolean(checked)}
          onCheckedChange={(checked) => {
            if (checked) {
              context.setSelectedItems((items) => ({ ...items, [id]: item }))
            } else {
              context.setSelectedItems((items) => remove(items, id))
            }
          }}
        />
      )
    },
  }
}

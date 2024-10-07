import { Checkbox } from '@radix-ui/themes'

import { type ListTableTypes } from '~/shared/table'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'
import { remove } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'

export type Context = {
  selectedItems: Dictionary
  setSelectedItems: SetterOrUpdater<Dictionary>
  idKey: string
}

export function createSelectionColumn<TItem extends Dictionary, TContext extends Context>(): ListTableTypes.Column<
  TItem,
  TContext
> {
  return {
    accessorKey: 'action',
    name: 'Действия',
    renderHeader: ({ context, list }) => {
      const selectedKeys = Object.keys(context.selectedItems)
      let checked = Boolean(selectedKeys.length)
      checked = (
        list.length !== selectedKeys.length && Boolean(selectedKeys.length) ? 'indeterminate' : checked
      ) as boolean
      return (
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => {
            if (checked) {
              context.setSelectedItems(toDictionary((item) => item[context.idKey] as string, list) || {})
            } else {
              context.setSelectedItems(() => ({}))
            }
          }}
        />
      )
    },
    cellProps: {
      style: {
        maxWidth: '44px',
        minWidth: '44px',
        width: '44px',
        textAlign: 'center',
        // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
        padding: '0',
        verticalAlign: 'middle',
      },
    },
    headerProps: {
      maxWidth: '44px',
      minWidth: '44px',
      width: '44px',
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

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
        maxWidth: '60px',
        minWidth: '60px',
        width: '60px',
        textAlign: 'right',
        // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
        padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
        verticalAlign: 'middle',
      },
    },
    headerProps: {
      maxWidth: '60px',
      minWidth: '60px',
      width: '60px',
      style: { textAlign: 'right', verticalAlign: 'middle' },
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

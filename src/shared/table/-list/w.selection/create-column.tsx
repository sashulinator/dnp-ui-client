import { Checkbox } from '@radix-ui/themes'

import { type Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { remove } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'

import { type Column } from '..'
import { type Context } from './models.context'

export function createColumn<TItem extends Dictionary, TContext extends Context<TItem>>(): Column<TItem, TContext> {
  return {
    // ыйы достаточно уникальный чтобы не совпадал с возможными ключами item
    name: 'ыйы',
    display: 'Selection',
    renderHeaderCell: ({ context, list }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSubscribeUpdate((update) => [context.selectedItemsAtom.subscribe(update)])

      const idKey = context.idKey
      const selectedItems = context.selectedItemsAtom.get()
      const setSelectedItems = context.selectedItemsAtom.set

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
    getCellProps() {
      return {
        style: {
          maxWidth: '32px',
          minWidth: '32px',
          width: '32px',
          textAlign: 'center',
          // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
          padding: '0',
          verticalAlign: 'middle',
          left: `0px`,
          background: 'var(--gray-1)',
          position: 'sticky',
          zIndex: 0,
        },
      }
    },
    getHeaderCellProps() {
      return {
        maxWidth: '32px',
        minWidth: '32px',
        width: '32px',
        style: {
          padding: '0',
          textAlign: 'center',
          verticalAlign: 'middle',
          left: `0px`,
          background: 'var(--gray-1)',
          position: 'sticky',
          zIndex: 0,
        },
      }
    },
    renderCell: ({ item, context }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSubscribeUpdate((update) => [context.selectedItemsAtom.subscribe(update)])

      const id = item[context.idKey!] as string
      const selectedItems = context.selectedItemsAtom.get()
      const setSelectedItems = context.selectedItemsAtom.set

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

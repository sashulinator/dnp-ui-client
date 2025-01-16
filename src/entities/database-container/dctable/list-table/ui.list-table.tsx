import { useMemo } from 'react'

import { ListTable } from '~/shared/table'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'
import { type Atom } from '~/utils/store'

export type Item = {
  id: string
  name: string
  schema: string
  display?: string | undefined
}

export type ItemSort = ListTable.Sort.ToSort<Item>
export type ItemSearchFilter = ListTable.Search.ReplaceValueByFilter<Item>

export interface Props extends Omit<ListTable.ListProps<Item, Dictionary>, 'context' | 'columns'> {
  className?: string | undefined
  selectedItemsAtom: Atom<Dictionary<Item>>
  sortAtom: Atom<ItemSort | undefined>
  searchFilter: ItemSearchFilter | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof Item, ListTable.Search.ReplaceValueByFilter<Item> | undefined>>
}

const NAME = 'databaseContainer-w-dctable-w-listTable'

export default function Component(props: Props): JSX.Element {
  const { selectedItemsAtom, sortAtom, searchFilter, setSearchFilter, ...listTableProps } = props

  const columns = useMemo(buildColumns, [])

  return (
    <ListTable.Search.default columns={columns} context={{ searchFilter, setSearchFilter }}>
      <ListTable.Sort.default columns={columns} context={{ sortAtom }}>
        <ListTable.Selection.default columns={columns} context={{ idKey: 'id', selectedItemsAtom }}>
          <ListTable.default columns={columns} context={{}} {...listTableProps} />
        </ListTable.Selection.default>
      </ListTable.Sort.default>
    </ListTable.Search.default>
  )
}

Component.displayName = NAME

function buildColumns(): ListTable.ColumnProps<Item, Dictionary>[] {
  return [
    { name: 'name', display: 'Название' },
    { name: 'schema', display: 'Схема' },
    { name: 'display', display: 'Отображение' },
  ]
}

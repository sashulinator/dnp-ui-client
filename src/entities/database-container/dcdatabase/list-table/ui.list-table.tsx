import Flex from '~/shared/flex'
import { Pagination, type PaginationProps } from '~/shared/page'
import { ListTable } from '~/shared/table'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'
import { type Atom } from '~/utils/store'

import type { DatabaseValue } from '../types'

export type Item = DatabaseValue

export type ItemSort = ListTable.Sort.ToSort<Item>
export type ItemSearchFilter = ListTable.Search.ReplaceValueByFilter<Item>

export interface Props extends Omit<ListTable.ListProps<Item, Dictionary>, 'context' | 'columns'> {
  className?: string | undefined
  columns?: ListTable.Column<Item, Dictionary>[]
  selectedItemsAtom?: Atom<Dictionary<Item>> | undefined
  sortAtom: Atom<ItemSort | undefined>
  searchFilter: ItemSearchFilter | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof Item, ListTable.Search.ReplaceValueByFilter<Item> | undefined>>
  paginationProps: PaginationProps
}

const NAME = 'dnp-databaseContainer-dcdatabase-listTable'

export default function Component(props: Props): JSX.Element {
  const {
    selectedItemsAtom,
    sortAtom,
    columns = defaultColumns,
    paginationProps,
    searchFilter,
    setSearchFilter,
    ...listTableProps
  } = props

  const table = <ListTable.default columns={columns as any} context={{}} {...listTableProps} />

  const selection = selectedItemsAtom ? (
    <ListTable.Selection.default columns={columns} context={{ idKey: 'id', selectedItemsAtom }}>
      {table}
    </ListTable.Selection.default>
  ) : (
    table
  )

  return (
    <Flex direction='column' width='100%'>
      <Pagination {...paginationProps} />

      <ListTable.Search.default columns={columns} context={{ searchFilter, setSearchFilter }}>
        <ListTable.Sort.default columns={columns} context={{ sortAtom }}>
          {selection}
        </ListTable.Sort.default>
      </ListTable.Search.default>
    </Flex>
  )
}

Component.displayName = NAME

const defaultColumns = [
  { name: 'name', display: 'Название' },
  { name: 'display', display: 'Отображение', searchable: false, sortable: false },
]

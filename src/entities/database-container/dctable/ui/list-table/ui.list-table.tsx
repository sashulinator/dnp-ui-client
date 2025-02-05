import { useMemo } from 'react'

import Flex from '~/shared/flex'
import { Pagination, PaginationProps } from '~/shared/page'
import { ListTable } from '~/shared/table'
import { type Dictionary, type SetterOrUpdater } from '~/utils/core'
import { type Atom } from '~/utils/store'

export type Item = {
  // так как name неуникальный, то заранее надо сгенерировать id например <name>.<schema>
  id: string
  name: string
  display?: string | undefined
  schema: string
}

export type ItemSort = ListTable.Sort.ToSort<Item>
export type ItemSearchFilter = ListTable.Search.ReplaceValueByFilter<Item>

export interface Props extends Omit<ListTable.ListProps<Item, Dictionary>, 'context' | 'columns'> {
  className?: string | undefined
  selectedItemsAtom: Atom<Dictionary<Item>>
  sortAtom: Atom<ItemSort | undefined>
  searchFilter: ItemSearchFilter | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof Item, ListTable.Search.ReplaceValueByFilter<Item> | undefined>>
  paginationProps: PaginationProps
}

const NAME = 'databaseContainer-w-dctable-w-listTable'

export default function Component(props: Props): JSX.Element {
  const { selectedItemsAtom, sortAtom, paginationProps, searchFilter, setSearchFilter, ...listTableProps } = props

  const columns = useMemo(buildColumns, [])

  return (
    <Flex direction='column' width='100%'>
      <Pagination {...paginationProps} />
      <ListTable.Search.default columns={columns} context={{ searchFilter, setSearchFilter }}>
        <ListTable.Sort.default columns={columns} context={{ sortAtom }}>
          <ListTable.Selection.default columns={columns} context={{ idKey: 'id', selectedItemsAtom }}>
            <ListTable.default columns={columns} context={{}} {...listTableProps} />
          </ListTable.Selection.default>
        </ListTable.Sort.default>
      </ListTable.Search.default>
    </Flex>
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

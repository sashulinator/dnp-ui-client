import { useMemo } from 'react'

import Flex from '~/shared/flex'
import { Pagination, type PaginationProps } from '~/shared/page'
import { ListTable } from '~/shared/table'
import { type Dictionary, type SetterOrUpdater, fns } from '~/utils/core'
import { type Atom } from '~/utils/store'

import type { Row } from '../types'

export type Item = Row

/*
 * уникальный ключ для селектинга
 * Так как row могут быть без первичного ключа а нам нужна уникальность
 * то добавим в row проперти SELECTION_ID, а как значение можно взять index
 * или любое другое уникальное значение
 */
export const SELECTION_ID = 'sлзълsЖ8*as5:7667Ъ'

export type ItemSort = ListTable.Sort.ToSort<Item>
export type ItemSearchFilter = ListTable.Search.ReplaceValueByFilter<Item>

export type Context = {
  selectedItemsAtom?: Atom<Dictionary<Item>> | undefined
  sortAtom: Atom<ItemSort | undefined>
  searchFilter: ItemSearchFilter | undefined
  setSearchFilter: SetterOrUpdater<Record<keyof Item, ItemSearchFilter | undefined>>
} & ListTable.DropdownMenu.Context

export interface Props<TContext extends Dictionary = Dictionary>
  extends Omit<ListTable.ListProps<Item, TContext>, 'columns'> {
  className?: string | undefined
  columns: ListTable.Column<Item, Dictionary>[]
  paginationProps: PaginationProps
  context: Context & TContext
}

const NAME = 'dnp-databaseContainer-dcrow-listTable'

export default function Component<TContext extends Dictionary = Dictionary>(props: Props<TContext>): JSX.Element {
  const { context, paginationProps, columns, list, ...listTableProps } = props

  const selectableList = useMemo(
    () => (context.selectedItemsAtom ? list.map((item, i) => ({ ...item, [SELECTION_ID]: i })) : list),
    [list],
  )

  const table = (
    <ListTable.default
      list={selectableList}
      columns={columns as any}
      {...listTableProps}
      context={context as TContext}
    />
  )

  const selection = context.selectedItemsAtom ? (
    <ListTable.Selection.default
      columns={columns}
      context={{ idKey: SELECTION_ID, selectedItemsAtom: context.selectedItemsAtom }}
    >
      {table}
    </ListTable.Selection.default>
  ) : (
    table
  )

  return (
    <Flex direction='column' width='100%'>
      <Pagination
        {...paginationProps}
        onChange={fns(paginationProps.onChange, () => context.selectedItemsAtom?.set({}))}
        onLimitChange={fns(paginationProps.onLimitChange, () => context.selectedItemsAtom?.set({}))}
      />

      <ListTable.Search.default columns={columns} context={context}>
        <ListTable.Sort.default columns={columns} context={context}>
          <ListTable.DropdownMenu.default columns={columns} context={context}>
            {selection}
          </ListTable.DropdownMenu.default>
        </ListTable.Sort.default>
      </ListTable.Search.default>
    </Flex>
  )
}

Component.displayName = NAME

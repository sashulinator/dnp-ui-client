import { useMemo, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import type { Props, Story } from '~/shared/storybook'
import { type Dictionary } from '~/utils/core'
import { createAtom } from '~/utils/store'

import List, { type ColumnProps, NAME } from './ui.list'
import SearchWrapper from './w.search'
import SelectionWrapper from './w.selection'
import SortWrapper, { type ToSort } from './w.sort'

interface State {}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [isSort, setIsSort] = useState(true)
    const [searchFilter, setSearchFilter] = useState({})

    const sortController = useMemo(() => createAtom<ToSort<Dictionary> | undefined>({}), [])
    const selectedItemsAtom = useMemo(() => createAtom<Dictionary<Dictionary>>({}), [])

    const rTableList = <List {...state} context={{}} list={list} columns={columns} />

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Flex>
          <Button onClick={() => setIsSort((s) => !s)}>isInjectedSortSearch</Button>
        </Flex>
        {isSort ? (
          <SearchWrapper columns={columns} context={{ searchFilter, setSearchFilter }}>
            <SortWrapper columns={columns} context={{ sortController }}>
              <SelectionWrapper columns={columns} context={{ selectedItemsAtom, idKey: 'id' }}>
                {rTableList}
              </SelectionWrapper>
            </SortWrapper>
          </SearchWrapper>
        ) : (
          rTableList
        )}
        <pre>{JSON.stringify(searchFilter, null, 2)}</pre>
      </Flex>
    )
  },

  getName: (): string => NAME,

  controls: [],
} satisfies Story<State>

/**
 * List
 */

type User = {
  id: string
  username: string
  age: number
}

const list: User[] = [
  {
    id: '1',
    username: 'John',
    age: 30,
  },
  {
    id: '2',
    username: 'Sara',
    age: 45,
  },

  {
    id: '3',
    username: 'Alexander',
    age: 45,
  },
  {
    id: '4',
    username: 'Thor',
    age: 45,
  },
  {
    id: '5',
    username: 'Spider-man',
    age: 45,
  },
]

const columns: ColumnProps<User, Dictionary<string>>[] = [
  {
    name: 'id',
    renderCell: ({ value }) => value,
    renderHeader: () => 'ID',
    display: 'ID',
  },
  {
    name: 'username',
    renderHeader: () => 'Имя пользователя',
    renderCell: ({ value }) => value,
    display: 'Имя пользователя',
  },
  {
    name: 'age',
    renderHeader: () => 'Возраст',
    renderCell: ({ value }) => value,
    display: 'Возраст',
  },
]

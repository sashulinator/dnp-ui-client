import Flex from '~/shared/flex'
import type { Props, Story } from '~/shared/storybook'
import { type Dictionary } from '~/utils/core'

import type { Column } from '../../column/models/column'
import List, { NAME } from '../ui/list'

interface State {}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <List {...state} loading={false} error={undefined} context={{}} list={list} columns={columns} />
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
  id: number
  username: string
  age: number
}

const list: User[] = [
  {
    id: 1,
    username: 'John',
    age: 30,
  },
  {
    id: 2,
    username: 'Sara',
    age: 45,
  },

  {
    id: 3,
    username: 'Alexander',
    age: 45,
  },
  {
    id: 4,
    username: 'Thor',
    age: 45,
  },
  {
    id: 4,
    username: 'Spider-man',
    age: 45,
  },
]

const columns: Column<User, Dictionary<string>>[] = [
  {
    accessorKey: 'id',
    renderCell: ({ value }) => value,
    renderHeader: () => 'ID',
    name: 'ID',
  },
  {
    accessorKey: 'username',
    renderHeader: () => 'Имя пользователя',
    renderCell: ({ value }) => value,
    name: 'Имя пользователя',
  },
  {
    accessorKey: 'age',
    renderHeader: () => 'Возраст',
    renderCell: ({ value }) => value,
    name: 'Возраст',
  },
]

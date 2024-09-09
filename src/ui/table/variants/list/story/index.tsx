import Flex from '~/ui/flex'
import type { Props } from '~/ui/storybook'
import { type Story } from '~/ui/storybook'

import Table, { NAME } from '..'
import type { Column } from '../ui/list'

interface State {}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Table {...state} list={list} columns={columns} />
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

const columns: Column<User>[] = [
  {
    key: 'id',
    renderCell: ({ value }) => value,
    renderHeader: () => 'ID',
  },
  {
    key: 'username',
    renderHeader: () => 'Имя пользователя',
    renderCell: ({ value }) => value,
  },
  {
    key: 'age',
    renderHeader: () => 'Возраст',
    renderCell: ({ value }) => value,
  },
]

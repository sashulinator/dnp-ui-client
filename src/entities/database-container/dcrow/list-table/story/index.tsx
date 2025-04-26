import { useMemo, useState } from 'react'

import DropdownMenu from '~/shared/dropdown-menu'
import { type Props, type Story } from '~/shared/storybook'
import { type ListTable } from '~/shared/table'
import { type Dictionary } from '~/utils/core'
import { useAtom } from '~/utils/store'

import DcrowListTable, { type Context, type Item } from '../ui.list-table'
import { getList } from './get-list'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [searchFilter, setSearchFilter] = useState<Context['searchFilter'] | undefined>(undefined)
    const selectedItemsAtom = useAtom<Dictionary<Item>>({})
    const sortAtom = useAtom<ListTable.Sort.ToSort<Dictionary> | undefined>({})

    const list = useMemo(getList, [])

    return (
      <div style={{ padding: '2rem', width: '1000px' }}>
        <DcrowListTable
          context={{
            searchFilter,
            setSearchFilter: setSearchFilter as Context['setSearchFilter'],
            sortAtom,
            selectedItemsAtom,
            renderDropdownMenuContent: () => {
              return <DropdownMenu.Content>hello</DropdownMenu.Content>
            },
          }}
          paginationProps={{} as any}
          list={list}
          columns={columns}
          {...state}
        />
      </div>
    )
  },

  controls: [
    // {
    //   name: 'name',
    //   input: 'input',
    //   defaultValue: '',
    // },
    // {
    //   name: 'name',
    //   input: 'select',
    //   options: [],
    //   defaultValue: '',
    // },
    // { name: 'name', input: 'checkbox', defaultValue: false },
  ],

  getName: (): string => DcrowListTable.displayName,
} satisfies Story<State>

const columns = [
  {
    name: 'name',
    display: 'Название',
  },
  { name: 'schema', display: 'Схема' },
  { name: 'display', display: 'Отображение' },
  { name: 'display', display: 'Отображение' },
  { name: 'display', display: 'Отображение' },
  { name: 'display', display: 'Отображение' },
  { name: 'display', display: 'Отображение' },
]

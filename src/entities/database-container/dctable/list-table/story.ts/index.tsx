import { useMemo, useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'
import { type ListTable } from '~/shared/table'
import { type Dictionary } from '~/utils/core'
import { useAtom } from '~/utils/store'

import DctableListTable, { type Props as DctableListTableProps, type Item } from '../ui.list-table'
import { getColumns } from './get-columns'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [searchFilter, setSearchFilter] = useState<DctableListTableProps['searchFilter'] | undefined>(undefined)
    const selectedItemsAtom = useAtom<Dictionary<Item>>({})
    const sort = useAtom<ListTable.Sort.ToSort<Dictionary> | undefined>({})

    const columns = useMemo(getColumns, [])
    const columnsWithId = useMemo(() => columns.map((c) => ({ ...c, id: `${c.name}.${c.schema}` })), [])

    return (
      <div style={{ padding: '2rem' }}>
        <DctableListTable
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter as any}
          sortAtom={sort}
          list={columnsWithId}
          selectedItemsAtom={selectedItemsAtom}
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

  getName: (): string => DctableListTable.displayName,
} satisfies Story<State>

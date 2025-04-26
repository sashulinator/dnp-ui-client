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

    return (
      <div style={{ padding: '2rem', width: '1000px' }}>
        <DctableListTable
          paginationProps={{} as any}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter as any}
          sortAtom={sort}
          list={columns}
          selectedItemsAtom={selectedItemsAtom}
          getHeaderCellProps={getCellProps as any}
          getCellProps={getCellProps as any}
          {...state}
        />
      </div>
    )

    function getCellProps(p: { column: { name: string } }) {
      const pinned = p.column.name === 'name'

      return {
        style: {
          left: pinned ? `32px` : undefined,
          background: pinned ? 'var(--color-background)' : undefined,
          position: pinned ? 'sticky' : undefined,
          minWidth: pinned ? '200px' : undefined,
          maxWidth: pinned ? '200px' : undefined,
          zIndex: pinned ? 0 : undefined,
        },
      }
    }
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

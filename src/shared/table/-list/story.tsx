import { DropdownMenu } from '@radix-ui/themes'

import { useMemo, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import type { Props, Story } from '~/shared/storybook'
import Editor from '~/slices/monaco-editor'
import { type Dictionary } from '~/utils/core'
import { createAtom } from '~/utils/store'

import type { Column, RenderCellProps } from './types'
import List, { NAME } from './ui.list'
import DropdownMenuWrapper from './w.dropdown-menu'
import SearchWrapper from './w.search'
import SelectionWrapper from './w.selection'
import SortWrapper, { type ToSort } from './w.sort'

interface State {}

interface DisplayOption {
  [columnName: string]: { sql: boolean }
}

type DisplayOptionContext = {
  displayOption: DisplayOption
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [isSort, setIsSort] = useState(true)
    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({})
    const [searchFilter, setSearchFilter] = useState({})

    const sortController = useMemo(() => createAtom<ToSort<Dictionary> | undefined>({}), [])
    const selectedItemsAtom = useMemo(() => createAtom<Dictionary<Dictionary>>({}), [])

    const rTableList = <List {...state} context={{ displayOption: displayOptions }} list={list} columns={columns} />

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Flex>
          <Button onClick={() => setIsSort((s) => !s)}>isInjectedSortSearch</Button>
        </Flex>
        {isSort ? (
          <SearchWrapper columns={columns} context={{ searchFilter, setSearchFilter }}>
            <SortWrapper columns={columns} context={{ sortAtom: sortController }}>
              <DropdownMenuWrapper
                columns={columns}
                context={{
                  renderDropdownMenuContent: (props) => {
                    const isSql = Boolean(displayOptions[props.column.name]?.sql)
                    return (
                      <DropdownMenu.Content>
                        <DropdownMenu.Item
                          onClick={() => {
                            setDisplayOptions({ ...displayOptions, [props.column.name]: { sql: !isSql } })
                          }}
                        >
                          Подсветить SQL
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    )
                  },
                }}
              >
                <SelectionWrapper columns={columns} context={{ selectedItemsAtom, idKey: 'id' }}>
                  {rTableList}
                </SelectionWrapper>
              </DropdownMenuWrapper>
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
    username: 'SELECT * FROM Customers',
    age: 45,
  },
]

const columns: Column<User, DisplayOptionContext>[] = [
  {
    name: 'id',
    renderCell,
    display: 'ID',
  },
  {
    name: 'username',
    renderHeaderCell: () => 'Имя пользователя',
    renderCell,
    display: 'Имя пользователя',
  },
  {
    name: 'age',
    renderHeaderCell: () => 'Возраст',
    renderCell,
    display: 'Возраст',
  },
]

function renderCell(props: RenderCellProps<User, DisplayOptionContext>) {
  if (props.context.displayOption[props.name]?.sql) {
    return (
      <Editor
        value={props.value.toString()}
        height='4rem'
        language='sql'
        options={{
          minimap: { enabled: false },
          lineNumbers: 'off',
          scrollBeyondLastLine: false,
          scrollbar: {
            horizontal: 'hidden',
            vertical: 'hidden',
          },
          overviewRulerLanes: 0, // Remove overview ruler
          wordWrap: 'on', // or 'off' depending on desired behavior
          renderLineHighlight: 'none', // Removes line highlight
          contextmenu: false, // Disable context menu (right-click)
          folding: false, // Disable code folding
          glyphMargin: false, // Remove the glyph margin (for breakpoints, etc.)
          hideCursorInOverviewRuler: true, // Hide cursor in overview ruler
        }}
      />
    )
  }
  return props.value
}

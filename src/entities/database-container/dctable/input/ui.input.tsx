import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import Button from '~/shared/button'
import { InputCard } from '~/shared/card'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import Spinner from '~/shared/spinner'
import { ListTable } from '~/shared/table'
import { Tabs } from '~/shared/tabs'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { type Dictionary } from '~/utils/core'
import { useSubscribe } from '~/utils/core-hooks'
import { remove } from '~/utils/dictionary'
import { type Atom, useAtomState } from '~/utils/store'

import { Dctable } from '../..'

export type Value = Dictionary<Omit<Dctable.Dctable, 'id'>>

const FIGURE_SPACE = ' ' // https://ru.wikipedia.org/wiki/Неразрывный_пробел

export interface Props {
  className?: string | undefined
  value: Value
  onChange: (value: Value) => void
  loading?: boolean | undefined
  fetchDatabaseList: () => Promise<{ items: { name: string; display?: string }[]; total: number }>
  fetchTableList: (params: {
    sort: Dctable.ListTable.ItemSort | undefined
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined
    database: string
    page: number
    limit: number
  }) => Promise<{ items: { name: string; display?: string; schema: string }[]; total: number }>
}

const NAME = 'dnp-databaseContainer-dctable-input'

export default function Component(props: Props): JSX.Element {
  const { loading, value, onChange } = props
  const [openAtom, , setIsOpen] = useAtomState<boolean>(false)

  const [database, setDatabase] = useState('')
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState<Dctable.ListTable.ListTableProps['searchFilter'] | undefined>(
    undefined,
  )
  const [selectedItemsAtom, selectedItems] = useAtomState<Dictionary<Dctable.ListTable.Item>>({})
  const [sortAtom, sort] = useAtomState<Dctable.ListTable.ItemSort | undefined>(undefined)
  const [limit, setLimit] = useState(10)

  useSubscribe(selectedItemsAtom.subscribe as any, onChange)

  const fetcher = useQuery(
    [NAME, 'tableFetcher', { searchFilter, database, sort, page }],
    () => props.fetchTableList({ sort: sortAtom.get(), searchFilter, database, page, limit }),
    {
      enabled: Boolean(database),
    },
  )

  const tableList = useMemo(() => {
    return fetcher.data?.items.map((i) => ({ ...i, id: `${i.name}.${i.schema}` }))
  }, [fetcher.data])

  const databasesFetcher = useQuery([NAME, 'databasesFetcher'], () => props.fetchDatabaseList())

  const valueList = Object.values(value)

  return (
    <>
      <InputCard.default style={{ width: '100%' }} onClick={() => setIsOpen(true)}>
        <Flex width='100%' justify='between' align='center'>
          <Flex direction='column'>
            <Tooltip content='Отображение'>
              <div>
                <Text color={valueList[0]?.display ? undefined : 'gray'}>{valueList[0]?.display || FIGURE_SPACE}</Text>
              </div>
            </Tooltip>
            <Tooltip content='Название'>
              <Text color='gray'>{valueList[0]?.name || FIGURE_SPACE}</Text>
            </Tooltip>
          </Flex>
          <Flex align='center' gap='2' mr='4'>
            {!loading && valueList.length > 1 && (
              <Button color='amber' variant='surface' size='1' asChild={true}>
                <Flex>+{valueList.length - 1}</Flex>
              </Button>
            )}
            {loading && <Spinner />}
          </Flex>
        </Flex>
      </InputCard.default>

      <Dialog.Root open={openAtom.get()}>
        <Dialog.Content maxWidth='1224px'>
          <Dialog.Title>
            <Flex gap='1' align='center' justify='between'>
              <Flex />
              <Button round={true} variant='ghost' onClick={() => openAtom.set(false)}>
                <Icon name='Cross1' />
              </Button>
            </Flex>
          </Dialog.Title>

          <Tabs.Root defaultValue='selected'>
            <Tabs.List>
              <Tabs.Trigger value='selected'>Выделенные</Tabs.Trigger>
              <Tabs.Trigger value='search'>Поиск</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='selected'>
              <ScrollArea scrollbars='horizontal'>
                <ListTable.default
                  context={{}}
                  // @ts-ignore
                  columns={buildColumns({ selectedItemsAtom })}
                  list={Object.values(selectedItems) || []}
                />
              </ScrollArea>
            </Tabs.Content>
            <Tabs.Content value='search'>
              <Flex gap='1' align='center' justify='between' mb='4' mt='4'>
                <Flex width='300px'>
                  <InputSelect.default
                    loading={databasesFetcher.isFetching}
                    onValueChange={(value) => setDatabase(value)}
                    value={database}
                    options={
                      databasesFetcher.data?.items.map((i) => ({ value: i.name, display: i.display || i.name })) || []
                    }
                  />
                </Flex>
              </Flex>

              <ScrollArea scrollbars='horizontal'>
                <Dctable.ListTable.default
                  list={tableList || []}
                  searchFilter={searchFilter}
                  paginationProps={{
                    limit,
                    onLimitChange: setLimit,
                    totalElements: fetcher.data?.total,
                    currentPage: page,
                    onChange: setPage,
                  }}
                  setSearchFilter={setSearchFilter as any}
                  sortAtom={sortAtom}
                  selectedItemsAtom={selectedItemsAtom}
                />
              </ScrollArea>
            </Tabs.Content>
            <Tabs.Content value='search'></Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

Component.displayName = NAME

function buildColumns(params: {
  selectedItemsAtom: Atom<Dictionary<Dctable.ListTable.Item>>
}): ListTable.ColumnProps<Dctable.ListTable.Item & { action: string }, Dictionary>[] {
  return [
    {
      name: 'action',
      display: 'Действия',
      renderCell({ item }) {
        return (
          <Button
            variant='ghost'
            round={true}
            onClick={() => {
              params.selectedItemsAtom.set(remove(params.selectedItemsAtom.get(), item.id))
            }}
          >
            <Icon name='Cross1' />
          </Button>
        )
      },
    },
    { name: 'name', display: 'Название' },
    { name: 'schema', display: 'Схема' },
    { name: 'display', display: 'Отображение' },
  ]
}

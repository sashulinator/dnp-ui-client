import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Input, { type InputProps } from '~/shared/input'
import Labeled from '~/shared/labeled'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import Spinner from '~/shared/spinner'
import { ListTable } from '~/shared/table'
import { Tabs } from '~/shared/tabs'
import { WithAvatar } from '~/shared/view'
import { type Dictionary, isEmpty } from '~/utils/core'
import { useSubscribe } from '~/utils/core-hooks'
import { remove } from '~/utils/dictionary'
import { type Atom, useAtomState } from '~/utils/store'

import { Dctable } from '../../..'

export type Value = Dictionary<Dctable.DctableMeta>

export interface Props extends Omit<InputProps, 'onChange' | 'children' | 'value'> {
  className?: string | undefined
  value: Value | undefined
  onChange: (value: Value | undefined) => void
  fetchDatabaseList: (params: {
    dcserviceId: string
  }) => Promise<{ items: { name: string; display?: string }[]; total: number }>
  fetchDcserviceList: () => Promise<{ items: { id: string; display?: string }[]; total: number }>
  fetchTableList: (params: {
    sort: Dctable.ListTable.ItemSort | undefined
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined
    database: string
    dcserviceId: string
    page: number
    limit: number
  }) => Promise<{ items: { name: string; display?: string | undefined; schema: string }[]; total: number }>
}

const NAME = 'dnp-databaseContainer-dctable-input'

export default function Component(props: Props): JSX.Element {
  const {
    loading,
    disabled,
    value: propsValue,
    onChange,
    fetchDatabaseList,
    fetchTableList,
    fetchDcserviceList,
    ...inputCardProps
  } = props
  const [openAtom, , setIsOpen] = useAtomState<boolean>(false)

  const value = isEmpty(propsValue) ? undefined : propsValue

  const [database, setDatabase] = useState('')
  const [dcserviceId, setDcserviceId] = useState('workshop')
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState<Dctable.ListTable.ListTableProps['searchFilter'] | undefined>(
    undefined,
  )
  const [selectedItemsAtom, selectedItems] = useAtomState<Dictionary<Dctable.ListTable.Item>>({})
  const [sortAtom, sort] = useAtomState<Dctable.ListTable.ItemSort | undefined>(undefined)
  const [limit, setLimit] = useState(10)
  const [selectedTableItems, setSelectedTableItems] = useState({})

  const onSave = () => {
    onChange(selectedTableItems)
  }
  useSubscribe(selectedItemsAtom.subscribe as any, setSelectedTableItems)

  const fetcher = useQuery(
    [NAME, 'tableFetcher', { searchFilter, database, sort, page, dcserviceId }],
    () => fetchTableList({ sort, searchFilter, dcserviceId, database, page, limit }),
    {
      enabled: Boolean(database && dcserviceId),
      staleTime: 10_000,
      keepPreviousData: true,
    },
  )

  const tableList = useMemo(() => {
    return fetcher.data?.items.map((i) => ({ ...i, id: `${i.name}.${i.schema}` }))
  }, [fetcher.data])

  const dcservicesFetcher = useQuery([NAME, 'databasesFetcher'], () => fetchDcserviceList())
  const databasesFetcher = useQuery([NAME, 'dcservicesFetcher', { dcserviceId }], () =>
    fetchDatabaseList({ dcserviceId }),
  )

  const valueList = Object.values(value || {})

  return (
    <>
      <Input
        size={null}
        hasValue={Boolean(value)}
        onClearableClick={() => onChange(undefined)}
        style={{ width: '100%', padding: 'var(--space-2)' }}
        variant='soft'
        {...inputCardProps}
        disabled={disabled}
        onClick={() => setIsOpen(true)}
      >
        <Flex width='100%' justify='between' align='center'>
          <WithAvatar
            disabled={disabled}
            style={{ maxWidth: '320px', width: '320px', overflow: 'hidden' }}
            title={valueList[0]?.name}
            subtitle={valueList[0]?.display}
            iconName='Table'
          />
          <Flex align='center' gap='2'>
            {!loading && valueList.length > 1 && (
              <Button color='amber' variant='surface' size='1' asChild={true} mr='2'>
                <Flex>+{valueList.length - 1}</Flex>
              </Button>
            )}
            {loading && <Spinner />}
          </Flex>
        </Flex>
      </Input>

      <Dialog.Root open={openAtom.get()}>
        <Dialog.Content maxWidth='1224px' minHeight='500px' style={{ position: 'relative' }}>
          <Flex position='absolute' top='var(--space-4)' right='var(--space-5)'>
            <Flex gap='1' align='center'>
              <Button
                variant='outline'
                onClick={() => {
                  selectedItemsAtom.set({})
                  setSelectedTableItems({})
                  onSave()
                }}
                style={{ marginLeft: '8px' }}
              >
                Отмена
              </Button>
              <Button
                variant='solid'
                onClick={() => {
                  onSave()
                  openAtom.set(false)
                }}
              >
                Выбрать
              </Button>
            </Flex>
          </Flex>

          <Tabs.Root defaultValue={valueList.length > 0 ? 'selected' : 'search'}>
            <Tabs.List>
              <Tabs.Trigger value='selected'>Выбрано</Tabs.Trigger>
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
              <Flex gap='6' align='center' mb='4' mt='4'>
                <Flex width='300px' gap='2' align='center'>
                  <Labeled label='Сервисы'>
                    <InputSelect.default
                      loading={dcservicesFetcher.isFetching}
                      onValueChange={(value) => setDcserviceId(value)}
                      value={dcserviceId}
                      options={
                        dcservicesFetcher.data?.items.map((i) => ({ value: i.id, display: i.display || i.display })) ||
                        []
                      }
                    />
                  </Labeled>
                </Flex>
                <Flex width='300px' gap='2' align='center'>
                  <Labeled label='База данных'>
                    <InputSelect.default
                      loading={databasesFetcher.isFetching}
                      onValueChange={(value) => setDatabase(value)}
                      value={database}
                      options={
                        databasesFetcher.data?.items.map((i) => ({ value: i.name, display: i.display || i.name })) || []
                      }
                    />
                  </Labeled>
                </Flex>
              </Flex>

              <ScrollArea scrollbars='horizontal'>
                <FetcherStatus
                  isError={fetcher.isError}
                  error={fetcher.error}
                  isFetching={fetcher.isFetching}
                  isLoading={fetcher.isLoading}
                  refetch={fetcher.refetch}
                  isChildrenOnFetchingVisible={true}
                >
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
                </FetcherStatus>
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
}): ListTable.Column<Dctable.ListTable.Item & { action: string }, Dictionary>[] {
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

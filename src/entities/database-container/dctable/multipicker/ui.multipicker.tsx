import { createElement, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import Button from '~/shared/button'
import Card from '~/shared/card'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { FetcherStatus } from '~/shared/query'
import { Tabs } from '~/shared/tabs'
import { WithAvatar } from '~/shared/view'
import { type Dictionary } from '~/utils/core'
import { preventDefault } from '~/utils/core-client'
import { remove } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'
import { useAtomState } from '~/utils/store'

import { Dctable } from '../..'

export type Value = {
  name: string | undefined
  schema: string | undefined
  display?: string | undefined
}

type RenderTriggerProps = {
  isOpen: boolean
  value: Value[] | undefined
  setIsOpen: (isOpen: boolean) => void
  setValue: (value: Value[] | undefined) => void
  enabled: boolean
}

export interface Props {
  className?: string | undefined
  value: Value[] | undefined
  enabled: boolean
  fetcherDependencies: unknown[]
  renderTrigger: (props: RenderTriggerProps) => React.ReactNode
  onChange: (value: Value[] | undefined) => void
  fetchTableList: (params: {
    sort: Dctable.ListTable.ItemSort | undefined
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined
    page: number
    limit: number
  }) => Promise<{ items: Value[]; total: number }>
}

const NAME = 'dnp-databaseContainer-dctable-multipicker'

export default function Component(props: Props): JSX.Element {
  const { fetcherDependencies, value = [], renderTrigger, enabled = true, onChange, fetchTableList } = props
  const [, isOpen, setIsOpen] = useAtomState<boolean>(false)

  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState<Dctable.ListTable.ListTableProps['searchFilter'] | undefined>(
    undefined,
  )
  const [sortAtom, sort] = useAtomState<Dctable.ListTable.ItemSort | undefined>(undefined)
  const [limit, setLimit] = useState(25)

  const [selectedItemsAtom] = useAtomState<Dictionary<Value>>({})

  useEffect(() => {
    if (!isOpen) selectedItemsAtom.set({})
    selectedItemsAtom.set(toDictionary((item) => `${item.name}.${item.schema}`, value) || {})
  }, [isOpen])

  useEffect(() => setPage(1), [sort, searchFilter, limit, ...fetcherDependencies])

  const fetcher = useQuery(
    [NAME, 'tableFetcher', { sort, searchFilter, page, limit }, ...fetcherDependencies],
    () => fetchTableList({ sort, searchFilter, page, limit }),
    {
      enabled,
      staleTime: 10_000,
      keepPreviousData: true,
    },
  )

  const tableList = useMemo(() => {
    return fetcher.data?.items.map((i) => ({ ...i, id: `${i.name}.${i.schema}` }))
  }, [fetcher.data])

  return (
    <>
      {createElement(renderTrigger, { setIsOpen, isOpen, setValue: onChange, value, enabled })}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content
          onOpenAutoFocus={preventDefault}
          maxWidth='1224px'
          height='75vh'
          minHeight='500px'
          style={{ position: 'relative' }}
        >
          <Tabs.Root defaultValue={value.length > 0 ? 'selected' : 'search'}>
            <Dialog.Title>
              <Flex width='100%' justify='between' pb='6'>
                <Tabs.List>
                  <Tabs.Trigger value='selected'>Выбрано ({Object.keys(selectedItemsAtom.get()).length})</Tabs.Trigger>
                  <Tabs.Trigger value='search'>Поиск</Tabs.Trigger>
                </Tabs.List>
                <Flex gap='2'>
                  <Button variant='outline' onClick={() => setIsOpen(false)}>
                    Отмена
                  </Button>
                  <Button
                    onClick={() => {
                      onChange(Object.values(selectedItemsAtom.get()))
                      setIsOpen(false)
                    }}
                  >
                    Выбрать
                  </Button>
                </Flex>
              </Flex>
            </Dialog.Title>

            <Tabs.Content value='selected'>
              <Flex direction='column' gap='2'>
                {Object.entries(selectedItemsAtom.get()).map(([key, item]) => {
                  return (
                    <Card>
                      <Flex width='100%' justify='between' align='center' pr='2'>
                        <WithAvatar width='100%' iconName='Table' title={item.name} subtitle={item.schema} />
                        <Button
                          onClick={() => {
                            selectedItemsAtom.set(remove(selectedItemsAtom.get(), key))
                          }}
                          round={true}
                          variant='ghost'
                        >
                          <Icon name='Cross2' />
                        </Button>
                      </Flex>
                    </Card>
                  )
                })}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value='search'>
              <FetcherStatus
                isError={fetcher.isError}
                error={fetcher.error}
                isFetching={fetcher.isFetching}
                isLoading={fetcher.isLoading}
                refetch={fetcher.refetch}
                isChildrenOnFetchingVisible={true}
              >
                <Dctable.ListTable.default
                  list={(tableList as any) || []}
                  searchFilter={searchFilter}
                  selectedItemsAtom={selectedItemsAtom as any}
                  rowSelectable={true}
                  paginationProps={{
                    loading: fetcher.isFetching,
                    limit,
                    onLimitChange: setLimit,
                    totalElements: fetcher.data?.total,
                    currentPage: page,
                    onChange: setPage,
                  }}
                  getRowProps={({ item }) => {
                    const selected = Boolean(selectedItemsAtom.get()[item.id])
                    return {
                      style: {
                        background: selected ? 'var(--accent-a5)' : undefined,
                      },

                      onClick: () => {
                        if (selectedItemsAtom.get()[item.id]) {
                          selectedItemsAtom.set(remove(selectedItemsAtom.get(), item.id))
                        } else {
                          selectedItemsAtom.set({ ...selectedItemsAtom.get(), [item.id]: item })
                        }
                      },
                    }
                  }}
                  setSearchFilter={setSearchFilter as any}
                  sortAtom={sortAtom}
                />
              </FetcherStatus>
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

Component.displayName = NAME

import { createElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import Dialog from '~/shared/dialog'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import { isEmpty } from '~/utils/core'
import { useAtomState } from '~/utils/store'

import ListTable, { type ItemSearchFilter, type ItemSort, type ListTableProps } from '../list-table'
import type { Dcservice } from '../types'

export type Value = Pick<Dcservice, 'display' | 'client' | 'host' | 'port' | 'id'>

type RenderTriggerProps = {
  isOpen: boolean
  value: Value | undefined
  setIsOpen: (isOpen: boolean) => void
  setValue: (value: Value | undefined) => void
  enabled: boolean
}

export interface Props {
  className?: string | undefined
  value: Value | undefined
  enabled: boolean
  fetcherDependencies: unknown[]
  renderTrigger: (props: RenderTriggerProps) => React.ReactNode
  onChange: (value: Value | undefined) => void
  fetchList: (params: {
    sort: ItemSort | undefined
    searchFilter: ItemSearchFilter | undefined
    page: number
    limit: number
  }) => Promise<{ items: Value[]; total: number }>
}

const NAME = 'dnp-databaseContainer-dcservice-picker'

export default function Component(props: Props): JSX.Element {
  const { fetcherDependencies, value: propsValue, renderTrigger, enabled = true, onChange, fetchList } = props
  const [, isOpen, setIsOpen] = useAtomState<boolean>(false)

  const value = isEmpty(propsValue) ? undefined : propsValue

  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState<ListTableProps['searchFilter'] | undefined>(undefined)
  const [sortAtom, sort] = useAtomState<ItemSort | undefined>(undefined)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    setPage(1)
  }, fetcherDependencies)

  const fetcher = useQuery(
    [NAME, 'tableFetcher', { searchFilter, sort, page }, ...fetcherDependencies],
    () => fetchList({ sort, searchFilter, page, limit }),
    {
      enabled,
      staleTime: 10_000,
      keepPreviousData: true,
    },
  )

  const tableList = fetcher.data?.items

  return (
    <>
      {createElement(renderTrigger, { setIsOpen, isOpen, setValue: onChange, value, enabled })}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content maxWidth='1224px' minHeight='500px' style={{ position: 'relative' }}>
          <ScrollArea scrollbars='horizontal'>
            <FetcherStatus
              isError={fetcher.isError}
              error={fetcher.error}
              isFetching={fetcher.isFetching}
              isLoading={fetcher.isLoading}
              refetch={fetcher.refetch}
              isChildrenOnFetchingVisible={true}
            >
              <ListTable
                list={tableList || []}
                searchFilter={searchFilter}
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
                  const selected = item.id === value?.id
                  return {
                    style: {
                      background: selected ? 'var(--accent-a5)' : undefined,
                    },
                    onClick: () => {
                      onChange(item)
                      setIsOpen(false)
                    },
                  }
                }}
                setSearchFilter={setSearchFilter as any}
                sortAtom={sortAtom}
              />
            </FetcherStatus>
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

Component.displayName = NAME

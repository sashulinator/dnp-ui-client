import { createElement, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import Dialog from '~/shared/dialog'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import { isEmpty } from '~/utils/core'
import { preventDefault } from '~/utils/core-client'
import { useAtomState } from '~/utils/store'

import { Dctable } from '../..'

export type Value = {
  name: string
  schema: string
  display?: string | undefined
}

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
  fetchTableList: (params: {
    sort: Dctable.ListTable.ItemSort | undefined
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined
    page: number
    limit: number
  }) => Promise<{ items: Value[]; total: number }>
}

const NAME = 'dnp-databaseContainer-dctable-picker'

export default function Component(props: Props): JSX.Element {
  const { fetcherDependencies, value: propsValue, renderTrigger, enabled = true, onChange, fetchTableList } = props
  const [, isOpen, setIsOpen] = useAtomState<boolean>(false)

  const value = isEmpty(propsValue) ? undefined : propsValue

  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState<Dctable.ListTable.ListTableProps['searchFilter'] | undefined>(
    undefined,
  )
  const [sortAtom, sort] = useAtomState<Dctable.ListTable.ItemSort | undefined>(undefined)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    setPage(1)
  }, fetcherDependencies)

  const fetcher = useQuery(
    [NAME, 'tableFetcher', { searchFilter, sort, page }, ...fetcherDependencies],
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
          minHeight='500px'
          style={{ position: 'relative' }}
        >
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
                  const selected = item.name === value?.name && item.schema === value.schema
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

import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { Dctable } from '~/entities/database-container'
import Button from '~/shared/button'
import { InputCard } from '~/shared/card'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import Text from '~/shared/text'
import TextInput from '~/shared/text-input'
import { type Dictionary, isEmpty } from '~/utils/core'
import { useAtomState } from '~/utils/store'

export type Value = {
  column: string
  table: string
}

const FIGURE_SPACE = ' ' // https://ru.wikipedia.org/wiki/Неразрывный_пробел

export interface Props extends Omit<InputCard.InputProps, 'onChange' | 'children'> {
  className?: string | undefined
  value: Value | undefined
  onChange: (value: Value | undefined) => void
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
const DCSERVICE_ID = 'workshop'
const DATABASE = 'operational'

export default function Component(props: Props): JSX.Element {
  const { value: propsValue, onChange, fetchTableList, ...inputCardProps } = props
  const [openAtom, , setIsOpen] = useAtomState<boolean>(false)

  const value = isEmpty(propsValue) ? undefined : propsValue
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState<Dctable.ListTable.ListTableProps['searchFilter'] | undefined>(
    undefined,
  )
  const [selectedItemsAtom, selectedItems] = useAtomState<Dictionary<Dctable.ListTable.Item>>({})
  const [sortAtom, sort] = useAtomState<Dctable.ListTable.ItemSort | undefined>(undefined)
  const [limit, setLimit] = useState(10)

  const selectedTable = Object.values(selectedItems || {})[0] as unknown as Dctable.DctableMeta

  const fetcher = useQuery(
    [NAME, 'tableFetcher', { searchFilter, database: DATABASE, sort, page, dcserviceId: DCSERVICE_ID }],
    () => fetchTableList({ sort, searchFilter, dcserviceId: DCSERVICE_ID, database: DATABASE, page, limit }),
    {
      enabled: Boolean(DATABASE && DCSERVICE_ID),
      staleTime: 10_000,
      keepPreviousData: true,
    },
  )

  const tableList = useMemo(() => {
    return fetcher.data?.items.map((i) => ({ ...i, id: `${i.name}.${i.schema}` }))
  }, [fetcher.data])

  return (
    <>
      <InputCard.default
        clearable={Boolean(value)}
        onClearableClick={() => onChange(undefined)}
        style={{ width: '100%' }}
        {...inputCardProps}
        onClick={() => setIsOpen(true)}
      >
        <Flex width='100%' justify='between' align='center'>
          <Flex direction='column'>
            <Text>{value ? `${value?.table}.${value?.column}` : FIGURE_SPACE}</Text>
          </Flex>
        </Flex>
      </InputCard.default>

      <Dialog.Root open={openAtom.get()}>
        <Dialog.Content maxWidth='1224px' style={{ position: 'relative' }}>
          <Flex justify='end'>
            <Button round={true} variant='ghost' onClick={() => openAtom.set(false)}>
              <Icon name='Cross1' />
            </Button>
          </Flex>
          {selectedTable ? (
            <Flex maxWidth='500px' gap='4'>
              <TextInput
                value={selectedTable.name}
                clearable={true}
                readOnly={true}
                onChange={() => {
                  selectedItemsAtom.set({})
                }}
              />
              <InputSelect.default
                variant='surface'
                options={selectedTable.columns.map((c) => ({ value: c.name, display: c.name }))}
                onValueChange={(newValue) => {
                  onChange({ column: newValue, table: selectedTable.name })
                }}
              />
            </Flex>
          ) : (
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
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

Component.displayName = NAME

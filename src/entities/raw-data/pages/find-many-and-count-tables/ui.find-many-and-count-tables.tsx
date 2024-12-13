import { useMemo } from 'react'

import { APP } from '~/app/constants.app'
import { api as analyticsApi } from '~/entities/analytics'
import { type FlatTable } from '~/entities/database-container'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import { RenderCounter } from '~/shared/debug'
import Flex from '~/shared/flex'
import { Pagination } from '~/shared/page'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import Section from '~/shared/section'
import { ListTable } from '~/shared/table'
import Text, { HighlightedText } from '~/shared/text'
import { JSONParam, NumberParam, useQueryParam, useQueryParams, withDefault } from '~/shared/use-query-params'
import { type ToSort, useSort } from '~/slices/sort'
import { createSelectionColumn } from '~/slices/table/lib/selection-action-column'
import { type Any, type Dictionary, c } from '~/utils/core'
import { type Atom, createAtom } from '~/utils/store'

import { SLICE } from '../../constants.slice'
import _Heading from './widgets/heading'
import _RunAnalyticsDialog from './widgets/run-analytics-dialog'
import _SelectionActions from './widgets/selection-actions'

type TableContext = ListTable.Sort.Context<FlatTable> &
  ListTable.Search.Context<FlatTable> & {
    selectedItemsController: Atom<Dictionary<FlatTable>>
    idKey: string
  }

const NAME = `${APP}-${SLICE}-FindManyAndCountTables`

export default function Component(): JSX.Element {
  const selectedItemsController = useMemo(() => createAtom<Dictionary<FlatTable>>({}), [])

  const sortController = useMemo(() => createAtom<ToSort<Dictionary> | undefined>(undefined), [])
  const [sortParam, , setSort] = useSort([sortController.set])
  sortController.subscribe((value, prev) => prev !== value && setSort(value))

  const runAnalyticsDialogController = useMemo(() => createAtom(false), [])

  const [columnSearchParams, setColumnSearchParams] = useQueryParam<
    string,
    ListTable.Search.ReplaceValueByFilter<FlatTable>
  >('columnSearch', JSONParam as Any)

  const [{ page = 1, limit = 100 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      limit: withDefault(NumberParam, 100),
    },
    { removeDefaultsFromUrl: true },
  )

  const requestParams = {
    where: { ...columnSearchParams },
    offset: (page - 1) * limit,
    limit,
    sort: sortParam,
  }

  const tableListFetcher = analyticsApi.analytics.findManyAndCountTables.useCache(requestParams, {
    keepPreviousData: true,
    staleTime: 10_000,
  })

  const analyticalActionsListFetcher = analyticsApi.action.getMany.useCache()

  const uiColumns = useMemo(buildUiColumns, [])

  return (
    <>
      <main className={NAME} style={{ position: 'relative' }}>
        <RenderCounter style={{ top: 0 }} />
        <Container p='4'>
          <Section size='1' className={c(cssAnimations.Appear)}>
            <_Heading />
          </Section>

          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
            <Pagination
              currentPage={page}
              limit={limit}
              loading={!tableListFetcher ? false : tableListFetcher.isFetching}
              totalElements={tableListFetcher?.data?.total}
              onChange={(page) => setPaginationParams({ page })}
            />
          </Section>

          <Section>
            <Flex style={{ position: 'relative' }}>
              <_SelectionActions
                selectedItemsController={selectedItemsController}
                onRunAnalyticsClick={() => runAnalyticsDialogController.set(true)}
                style={{ position: 'absolute', top: '-1.5rem', left: '0' }}
              />
              <FetcherStatus
                isChildrenOnFetchingVisible={true}
                isLoading={tableListFetcher.isLoading}
                isFetching={tableListFetcher.isFetching}
                isError={tableListFetcher.isError}
                error={tableListFetcher.error?.response?.data}
                refetch={tableListFetcher.refetch}
              >
                <ScrollArea scrollbars='horizontal'>
                  <ListTable.default<FlatTable, TableContext>
                    className={c(cssAnimations.Appear)}
                    list={tableListFetcher.data?.items ?? []}
                    columns={uiColumns}
                    context={{
                      idKey: 'id',
                      selectedItemsController,
                      sortController: sortController,
                      searchFilter: columnSearchParams,
                      setSearchFilter: (value) => {
                        const newValue = typeof value === 'function' ? value(columnSearchParams as any) : value
                        setColumnSearchParams(newValue as any)
                      },
                    }}
                  />
                </ScrollArea>
              </FetcherStatus>
            </Flex>
          </Section>
        </Container>
      </main>

      <_RunAnalyticsDialog
        analyticalActions={analyticalActionsListFetcher.data?.data ?? []}
        dialogController={runAnalyticsDialogController}
        selectedItemsController={selectedItemsController}
      />
    </>
  )

  function buildUiColumns(): ListTable.ColumnProps<FlatTable, TableContext>[] {
    const selectionColumn = createSelectionColumn<FlatTable, TableContext>()
    const columns: ListTable.ColumnProps<FlatTable, TableContext>[] = [
      {
        name: 'serviceDisplay',
        display: 'Сервис',
        renderCell: (props) => <HighlightedText>{props.item.serviceDisplay}</HighlightedText>,
        renderHeader: (props) => props.display,
      },
      {
        name: 'databaseName',
        display: 'База данных',
        renderCell: (props) => <HighlightedText>{props.item.databaseName}</HighlightedText>,
        renderHeader: (props) => props.display,
      },
      {
        name: 'databaseDisplay',
        display: '(бизнес название)',
        renderCell: (props) => <Text color='gray'>{props.item.databaseDisplay}</Text>,
        renderHeader: (props) => props.display,
      },
      {
        name: 'schemaName',
        display: 'Схема',
        renderCell: (props) => <HighlightedText>{props.item.schemaName}</HighlightedText>,
        renderHeader: (props) => props.display,
      },
      {
        name: 'schemaDisplay',
        display: '(бизнес название)',
        renderCell: (props) => <Text color='gray'>{props.item.schemaDisplay}</Text>,
        renderHeader: (props) => props.display,
      },
      {
        name: 'name',
        display: 'Таблица',
        renderCell: (props) => <HighlightedText>{props.item.name}</HighlightedText>,
        renderHeader: (props) => props.display,
      },
      {
        name: 'display',
        display: '(бизнес название)',
        renderCell: (props) => <Text color='gray'>{props.item.display}</Text>,
        renderHeader: (props) => props.display,
      },
    ]

    const searchColumns = columns.map(ListTable.Search.toSearchColumn)
    const sortColumns = searchColumns.map(ListTable.Sort.injectIntoHeader)

    return [selectionColumn, ...sortColumns]
  }
}

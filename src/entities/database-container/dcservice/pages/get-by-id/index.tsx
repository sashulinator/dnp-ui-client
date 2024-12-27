import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { APP } from '~/app/constants.app'
import { routes } from '~/app/route'
import { api as processingApi } from '~/entities/processing'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Heading, Main } from '~/shared/page'
import { queryClient } from '~/shared/query'
import Section from '~/shared/section'
import type { ListTable } from '~/shared/table'
import { Tabs } from '~/shared/tabs'
import {
  JSONParam,
  NumberParam,
  StringParam,
  useQueryParam,
  useQueryParams,
  withDefault,
} from '~/shared/use-query-params'
import { api as fileApi } from '~/slices/files'
import { type ToSort, useSort } from '~/slices/sort'
import { type Any, type Dictionary, assertDefined, c } from '~/utils/core'
import { usePrevious } from '~/utils/core-hooks/previous'
import { createAtom } from '~/utils/store'

import { dcserviceApi } from '../..'
import { SLICE } from '../../constants.slice'
import DcserviceForm, { type Values } from '../../ui/form'
import TestConnection from '../../ui/test-connection'
import DataTab from './data-tab'

const NAME = `${APP}-page-${SLICE}-GetById`
const BUCKET_NAME = 'ui-server'

export default function Component(): JSX.Element {
  const { id = '' } = useParams()

  const [tab, setTab] = useQueryParam('name', withDefault(StringParam, 'dcservice'))
  const [database, setDatabase] = useQueryParam('database', withDefault(StringParam, ''))
  const [table, setTable] = useQueryParam('table', withDefault(StringParam, ''))

  const [{ page = 1, limit = 25 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      limit: withDefault(NumberParam, 25),
    },
    { removeDefaultsFromUrl: true },
  )

  const sortAtom = useMemo(() => createAtom<ToSort<Dictionary> | undefined>(undefined), [])
  const [sortParam, , setSort] = useSort([sortAtom.set])
  sortAtom.subscribe((value, prev) => prev !== value && setSort(value))

  const [columnSearchParams, setSearchFilter] = useQueryParam<string, ListTable.Search.ToSort<Dictionary>>(
    'columnSearch',
    JSONParam as Any,
  )

  const fetcher = dcserviceApi.getById.useCache(
    { id },
    {
      onSuccess(dcservice) {
        form.initialize(DcserviceForm.toValues(dcservice))
      },
    },
  )

  const databasesFetcher = dcserviceApi.findDatabases.useCache({ id })

  const tablesFetcher = dcserviceApi.findTables.useCache({ id, database })

  const rowParams = {
    sort: sortParam,
    limit,
    offset: (page - 1) * limit,
    where: { ...columnSearchParams },
  }

  const prev = usePrevious({ id, database, table, ...rowParams })
  useEffect(() => {
    queryClient.setQueryData([dcserviceApi.findRows.NAME, prev], () => undefined)
  }, [table])

  const rowsFetcher = dcserviceApi.findRows.useCache(
    { id, database, table, ...rowParams },
    { keepPreviousData: true, staleTime: 10_000 },
  )

  const updateMutator = dcserviceApi.update.useMutation({
    onSuccess: (response) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(DcserviceForm.toValues(response.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<Values>(
    {
      initialValues: fetcher.data ? DcserviceForm.toValues(fetcher.data) : {},
      onSubmit: (values) => {
        assertDefined(fetcher.data)
        const input = { ...fetcher.data, ...DcserviceForm.toDcservice(values) }
        updateMutator.mutate({ input })
      },
    },
    {
      values: true,
    },
  )

  const formState = form.getState()
  const isAnimated = useMemo(() => !fetcher.data, [])

  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <Container p='var(--space-4)'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1' className={c(isAnimated && cssAnimations.Appear)}>
            <Flex align='center' justify='between' gap='2'>
              <Heading.Root route={routes.dcservice_getById} backRoute={routes.dcservice_findWithTotal}>
                <Heading.BackToParent />
                <Heading.Name />
                <Heading.Unique string={formState.values.display} tooltipContent='Отображение' />
              </Heading.Root>
            </Flex>
          </Section>
        )}

        <Tabs.Root value={tab} onValueChange={(value) => setTab(value)}>
          <Tabs.List>
            <Tabs.Trigger value='dcservice'>Сервис</Tabs.Trigger>
            <Tabs.Trigger value='data'>Просмотр данных</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value='dcservice' style={{ width: '100%' }}>
            <Section
              size='1'
              width='720px'
              className={c(isAnimated && cssAnimations.Appear)}
              style={{ animationDelay: `${TICK_MS * 2}ms` }}
            >
              <Form form={form} disabled={fetcher.isLoading} component={DcserviceForm} />
            </Section>

            <Section
              size='1'
              className={c(isAnimated && cssAnimations.Appear)}
              style={{ animationDelay: `${TICK_MS * 3}ms` }}
            >
              <Flex justify='start'>
                <Flex gap='2' direction='row' justify='end'>
                  <Flex gap='2' direction='column'>
                    <TestConnection
                      disabled={form.getState().invalid}
                      request={() =>
                        dcserviceApi.testConnection
                          .request({
                            client: 'pg',
                            host: formState.values.host,
                            port: formState.values.port,
                            user: formState.values.username,
                            password: formState.values.password,
                          })
                          .then((ret) => ret.data)
                      }
                    />
                    <Flex>
                      <Button
                        // loading={updateMutator.isLoading}
                        disabled={!form.getState().dirty || form.getState().invalid}
                        onClick={form.submit}
                      >
                        Сохранить
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Section>
          </Tabs.Content>
          <Tabs.Content value='data' style={{ width: '100%' }}>
            <DataTab
              uploadModalProps={{
                upload: async (file) => {
                  const response = await fileApi.upload.request({ file, fileName: file.name, bucketName: BUCKET_NAME })
                  processingApi.excelToTable.request({
                    fileNames: [response.data.fileName],
                    bucketName: BUCKET_NAME,
                    dcserviceId: id,
                    table: table || '',
                    database: database || '',
                  })
                },
              }}
              fetcherStatusProps={{
                isChildrenOnFetchingVisible: true,
                isLoading: rowsFetcher.isLoading,
                isFetching: rowsFetcher.isLoading,
                isError: rowsFetcher.isError,
                error: rowsFetcher.error as null,
                refetch: rowsFetcher.refetch,
              }}
              listTableProps={{
                columns: rowsFetcher.data?.columns,
                list: rowsFetcher.data?.items || [],
                context: {
                  setSearchFilter: setSearchFilter as any,
                  searchFilter: columnSearchParams,
                  sortController: sortAtom,
                },
              }}
              paginationProps={{
                onLimitChange: (limit) => setPaginationParams({ page: 1, limit }),
                limit,
                limitOptions: [10, 25, 50, 100],
                totalElements: rowsFetcher.data?.total,
                loading: rowsFetcher.isFetching,
                currentPage: page,
                onChange: (page) => setPaginationParams({ page, limit }),
              }}
              tableSelectProps={{
                value: table,
                onChange: (v) => {
                  setTable(v.toString())
                  setPaginationParams({ page: 1, limit })
                  sortAtom.set({})
                  setSearchFilter({} as any)
                },
                options:
                  tablesFetcher.data?.items?.map((db) => ({
                    value: db.name,
                    display: db.display || db.name,
                  })) || [],
              }}
              databaseSelectProps={{
                value: database,
                onChange: (v) => {
                  setDatabase(v.toString())
                  setPaginationParams({ page: 1, limit })
                  sortAtom.set({})
                  setSearchFilter({} as any)
                  setTable(undefined)
                },
                options:
                  databasesFetcher.data?.items?.map((db) => ({
                    value: db.name,
                    display: db.display || db.name,
                  })) || [],
              }}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Main>
  )
}

Component.displayName = NAME

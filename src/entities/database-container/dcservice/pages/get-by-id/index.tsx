import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { APP } from '~/app/constants.app'
import { routes } from '~/app/route'
import { type Dcrow, Dctable } from '~/entities/database-container'
import { api as processingApi } from '~/entities/processing'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import DropdownMenu from '~/shared/dropdown-menu'
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
import Editor from '~/slices/monaco-editor'
import { type ToSort, useSort } from '~/slices/sort'
import { type Any, type Dictionary, assertDefined, c } from '~/utils/core'
import { usePrevious } from '~/utils/core-hooks/previous'
import { createAtom, useAtom } from '~/utils/store'

import { api as dcserviceApi } from '../..'
import { SLICE } from '../../constants.slice'
import DcserviceForm, { type Values } from '../../ui/form'
import TestConnection from '../../ui/test-connection'
import DataTab from './data-tab'

const NAME = `${APP}-page-${SLICE}-GetById`
const BUCKET_NAME = 'ui-server'

export interface DisplayOption {
  [columnName: string]: { type: string }
}

export default function Component(): JSX.Element {
  const { id = '' } = useParams()

  const [tab, setTab] = useQueryParam('name', withDefault(StringParam, 'dcservice'))
  const [databaseParam, setDatabaseParam] = useQueryParam('database', withDefault(StringParam, ''))
  const [tableParam, setTableParam] = useQueryParam('table', withDefault(StringParam, ''))
  const [schemaParam, setSchemaParam] = useQueryParam('schema', withDefault(StringParam, ''))
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({})

  const tablesFetcher = dcserviceApi.findTables.useCache({
    dcdatabaseLocator: {
      dcserviceId: id,
      name: databaseParam,
    },
  })

  const tableMeta = useMemo(
    () =>
      tablesFetcher.data?.items.find((i) =>
        Dctable.isSameLocator(i, {
          dcserviceId: id,
          database: databaseParam,
          schema: schemaParam,
          name: tableParam,
        }),
      ),
    [tablesFetcher.data, tableParam, displayOptions],
  )
  const mutatedColumns = useMemo(_mutateColumns, [tableMeta, tableParam, displayOptions])

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

  const rowParams = {
    sort: sortParam,
    limit,
    offset: (page - 1) * limit,
    where: { ...columnSearchParams },
  }

  const prev = usePrevious({ id, database: databaseParam, table: tableParam, ...rowParams })
  useEffect(() => {
    queryClient.setQueryData([dcserviceApi.findRows.NAME, prev], () => undefined)
  }, [tableParam])

  const rowsFetcher = dcserviceApi.findRows.useCache(
    { id, database: databaseParam, table: tableParam, schema: schemaParam, ...rowParams },
    { keepPreviousData: true, staleTime: 10_000 },
  )

  const updateMutator = dcserviceApi.update.useMutation({
    onSuccess: (response) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(DcserviceForm.toValues(response.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<Values>({
    initialValues: fetcher.data ? DcserviceForm.toValues(fetcher.data) : {},
    onSubmit: (values) => {
      assertDefined(fetcher.data)
      const input = { ...fetcher.data, ...DcserviceForm.toDcservice(values) }
      updateMutator.mutate({ input })
    },
  })

  const formState = form.getState()
  const isAnimated = useMemo(() => !fetcher.data, [])

  const updateRowMutator = dcserviceApi.updaterow.useMutation({
    onSuccess: () => {
      notify({ title: 'Сохранено', type: 'success' })
      updateRowForm.initialize({})
      isUpdateFormModalOpen.set(false)
      rowsFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const createRowMutator = dcserviceApi.insertRow.useMutation({
    onSuccess: () => {
      notify({ title: 'Сохранено', type: 'success' })
      createRowForm.initialize({})
      isCreateFormModalOpen.set(false)
      rowsFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const isUpdateFormModalOpen = useAtom(false)
  const isCreateFormModalOpen = useAtom(false)

  const createRowForm = useCreateForm<Dcrow.FormModal.Row>(
    {
      onSubmit: (values) => {
        createRowMutator
          .mutateAsync({
            id,
            row: values,
            database: databaseParam,
            schema: schemaParam,
            table: tableParam,
          })
          .then((res) => res.data)
      },
      initialValues: {},
    },
    { initialValues: true },
  )

  const updateRowForm = useCreateForm<Dcrow.FormModal.Row>(
    {
      onSubmit: (values) => {
        const initialValues = updateRowForm.getState().initialValues
        updateRowMutator
          .mutateAsync({
            id,
            where: initialValues,
            row: values,
            database: databaseParam,
            schema: schemaParam,
            table: tableParam,
          })
          .then((res) => res.data)
      },
      initialValues: {},
    },
    { initialValues: true },
  )

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
              queryParams={{
                dcserviceId: id,
                table: tableParam,
                database: databaseParam,
                schema: schemaParam,
              }}
              uploadModalProps={{
                upload: async (file) => {
                  const response = await fileApi.upload.request({ file, fileName: file.name, bucketName: BUCKET_NAME })
                  processingApi.excelToTable.request({
                    fileNames: [response.data.fileName],
                    bucketName: BUCKET_NAME,
                    dcserviceId: id,
                    table: tableParam || '',
                    database: databaseParam || '',
                    schema: schemaParam || '',
                  })
                },
              }}
              updateFormModalProps={{
                onClose: () => {
                  isUpdateFormModalOpen.set(false)
                  updateRowForm.initialize({})
                },
                open: isUpdateFormModalOpen,
                form: updateRowForm,
                columns: mutatedColumns,
                mutator: updateRowMutator,
              }}
              createFormModalProps={{
                onClose: () => {
                  isCreateFormModalOpen.set(false)
                  createRowForm.initialize({})
                },
                open: isCreateFormModalOpen,
                form: createRowForm,
                columns: mutatedColumns,
                mutator: createRowMutator,
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
                renderCell: useCallback((props) => {
                  if (props.column.type === 'sql') {
                    return (
                      <Editor
                        value={String(props.value)}
                        height='4rem'
                        language='sql'
                        options={{
                          readOnly: true,
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
                  return props.value as string
                }, []),
                getRowProps: ({ item }) => ({
                  onClick: () => {
                    isUpdateFormModalOpen.set(true)
                    updateRowForm.initialize(item)
                  },
                }),
                columns: mutatedColumns,
                list: rowsFetcher.data?.items || [],
                context: {
                  setSearchFilter: setSearchFilter as any,
                  searchFilter: columnSearchParams,
                  sortAtom: sortAtom,
                  renderDropdownMenuContent: (props) => {
                    const isSql = Boolean(displayOptions[props.column.name]?.type === 'sql')
                    return (
                      <DropdownMenu.Content>
                        <DropdownMenu.Item
                          onClick={() => {
                            if (isSql) {
                              // Находим изначальную колонку
                              const column = tableMeta?.columns.find((c) => c.name === props.column.name)
                              assertDefined(column, 'Невозможная ошибка')
                              // Возвращаем изначальный тип
                              setDisplayOptions({ ...displayOptions, [props.column.name]: { type: column.type } })
                            } else {
                              setDisplayOptions({ ...displayOptions, [props.column.name]: { type: 'sql' } })
                            }
                          }}
                        >
                          Подсветить SQL
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    )
                  },
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
                value: `${schemaParam}.${tableParam}`,
                onValueChange: (v) => {
                  const [schemaName, tableName] = v.toString().split('.')
                  setTableParam(tableName)
                  setSchemaParam(schemaName)
                  setPaginationParams({ page: 1, limit })
                  sortAtom.set({})
                  setSearchFilter({} as any)
                },
                options:
                  tablesFetcher.data?.items?.map((t) => ({
                    value: `${t.schema}.${t.name}`,
                    display: `${t.schema}.${t.name}`,
                  })) || [],
              }}
              databaseSelectProps={{
                value: databaseParam,
                onChange: (v) => {
                  setDatabaseParam(v.toString())
                  setPaginationParams({ page: 1, limit })
                  sortAtom.set({})
                  setSearchFilter({} as any)
                  setTableParam(undefined)
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

  /**
   * Private
   */

  // Мутирует колонки для Формы редактирования строки
  function _mutateColumns() {
    return tableMeta?.columns.map((c) => {
      return { ...c, ...displayOptions[c.name] }
    })
  }
}

Component.displayName = NAME

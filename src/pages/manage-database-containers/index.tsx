import { Tooltip } from '@radix-ui/themes'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { confirm } from '~/app/controller'
import { history, routes } from '~/app/route'
import { Dccolumn, type Dcrow, Dcservice, Dctable } from '~/entities/database-container'
import { api as processingApi } from '~/entities/processing'
import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import Container from '~/shared/container'
import { cssAnimations } from '~/shared/css-animations'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'
import { useCreateForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { Heading, Main } from '~/shared/page'
import { queryClient } from '~/shared/query'
import Section from '~/shared/section'
import type { ListTable } from '~/shared/table'
import Text from '~/shared/text'
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
import { get, setPath } from '~/utils/dictionary'
import { createAtom, useAtom } from '~/utils/store'
import { notifyError, notifySuccess } from '~notification'

import DcserviceForm, { type Values } from '../../entities/database-container/dcservice/form'
import DataTab, { type DisplayOption } from './data-tab'
import { useContainer } from './use-container'

const NAME = `page-ManageDatabaseContainer`
const BUCKET_NAME = 'ui-server'

export default function Component(): JSX.Element {
  const { dcserviceId, database, setDatabase, setDcserviceId } = useContainer()

  const [tableParam, setTableParam] = useQueryParam('table', withDefault(StringParam, ''))
  const [schemaParam, setSchemaParam] = useQueryParam('schema', withDefault(StringParam, ''))
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({})
  const [tableDisplay, setTableDisplay] = useQueryParam('tabledisplay', withDefault(StringParam, ''))

  const primaryKeyFetcher = Dcservice.api.getPrimaryKey.useCache(
    {
      id: dcserviceId,
      schema: schemaParam,
      database: database.name,
      table: tableParam,
    },
    { retry: false },
  )
  const primaryKey = primaryKeyFetcher.data

  const deleteRowsMutator = Dcservice.api.deleteRowsByPk.useMutation({})

  const tablesFetcher = Dcservice.api.findTables.useCache({
    dcdatabaseLocator: {
      dcserviceId,
      name: database.name,
    },
  })

  const tableMeta = useMemo(
    () =>
      tablesFetcher.data?.items.find((i) =>
        Dctable.isSameLocator(i, {
          dcserviceId,
          database: database.name,
          schema: schemaParam,
          name: tableParam,
        }),
      ),
    [tablesFetcher.data, tableParam, displayOptions],
  )

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

  const fetcher = Dcservice.api.getById.useCache(
    { id: dcserviceId },
    {
      onSuccess(dcservice) {
        form.initialize(DcserviceForm.toValues(dcservice))
      },
    },
  )

  const rowParams = {
    sort: sortParam,
    limit,
    offset: (page - 1) * limit,
    where: { ...columnSearchParams },
  }

  const prev = usePrevious({ id: dcserviceId, database: database.name, table: tableParam, ...rowParams })
  useEffect(() => {
    queryClient.setQueryData([Dcservice.api.findRows.NAME, prev], () => undefined)
  }, [tableParam])

  const rowsFetcher = Dcservice.api.findRows.useCache(
    { id: dcserviceId, database: database.name, table: tableParam, schema: schemaParam, ...rowParams },
    { keepPreviousData: true, staleTime: 10_000 },
  )

  const mutatedColumns = useMemo(_mutateColumns, [rowsFetcher.data, tableParam, displayOptions])

  const updateMutator = Dcservice.api.update.useMutation({
    onSuccess: (response) => {
      notifySuccess({ title: 'Сохранено' })
      form.initialize(DcserviceForm.toValues(response.data))
    },
    onError: (error) => notifyError({ error }),
  })

  const removeMutator = Dcservice.api.removeById.useMutation({
    onSuccess: (response) => {
      notifySuccess({ title: 'Удалено' })
      form.initialize(DcserviceForm.toValues(response.data))
      history.push(routes.dcservice_findWithTotal.getUrl())
    },
    onError: (error) => {
      notifyError({ error })
    },
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

  const updateRowMutator = Dcservice.api.updaterow.useMutation({
    onSuccess: () => {
      notifySuccess({ title: 'Сохранено', type: 'success' })
      updateRowForm.initialize({})
      isUpdateFormModalOpen.set(false)
      rowsFetcher.refetch()
    },
    onError: (error) => notifyError({ error }),
  })

  const createRowMutator = Dcservice.api.insertRow.useMutation({
    onSuccess: () => {
      notifySuccess({ title: 'Сохранено', type: 'success' })
      createRowForm.initialize({})
      isCreateFormModalOpen.set(false)
      rowsFetcher.refetch()
    },
    onError: (error) => notifyError({ error }),
  })

  const isUpdateFormModalOpen = useAtom(false)
  const isCreateFormModalOpen = useAtom(false)
  const selectedItemsAtom = useAtom<Dictionary<Dcrow.Row>>({})

  const createRowForm = useCreateForm<Dcrow.FormModal.Row>(
    {
      onSubmit: (values) => {
        createRowMutator
          .mutateAsync({
            id: dcserviceId,
            row: values,
            database: database.name,
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
            id: dcserviceId,
            where: initialValues,
            row: values,
            database: database.name,
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
        <Section size='1' className={c(isAnimated && cssAnimations.Appear)}>
          <Flex align='center' justify='between' gap='2'>
            <Heading.Root route={routes.manageDatabaseContainers} backRoute={routes.main}>
              <Heading.BackToParent onClick={() => history.push(routes.dcservice_findWithTotal.getUrl())} />
              <Heading.Name />
              <Heading.Unique string={formState.values.display} tooltipContent='Отображение' />
              {!primaryKeyFetcher.data && !primaryKeyFetcher.isFetching && (
                <Flex display='inline-flex' ml='4'>
                  <Tooltip content='Удаление и редактирование недоступно так как у таблицы отсутствует Первичный ключ'>
                    <Button size='1' round={true} color='red'>
                      <Icon name='InfoCircled' />
                    </Button>
                  </Tooltip>
                </Flex>
              )}
            </Heading.Root>
          </Flex>
        </Section>

        <DataTab
          actionBarProps={{
            isCreateFormModalOpen: isCreateFormModalOpen,
            selectedItemsState: selectedItemsAtom,
            onRemoveClick: () => {
              confirm({
                title: 'Удалить?',
                onConfirm() {
                  const selected = Object.values(selectedItemsAtom.get() || {})
                  const pks = selected.map((item) => get(item, primaryKey) as string)
                  deleteRowsMutator
                    .mutateAsync({
                      id: dcserviceId,
                      schema: schemaParam,
                      database: database.name,
                      table: tableParam,
                      pks,
                    })
                    .then(() => {
                      selectedItemsAtom.set({})
                      rowsFetcher.refetch()
                    })
                },
              })
            },
          }}
          dcservicePickerProps={{
            enabled: true,
            fetcherDependencies: [dcserviceId],
            value: { id: dcserviceId },
            onValueChange: (value) => {
              setDcserviceId(value?.id)
              setDatabase(undefined)
              setTableDisplay(undefined)
              setPaginationParams({ page: 1, limit })
              sortAtom.set({})
              setSearchFilter({} as any)
              setTableParam(undefined)
            },
            fetchDisplay: async () =>
              Dcservice.api.getById.request({ id: dcserviceId as string }).then((res) => res.data),
            fetchList: async ({ sort, searchFilter, page, limit }) => {
              const ret = await Dcservice.api.findWithTotal.request({
                sort,
                where: searchFilter as any,
                take: limit,
                skip: (page - 1) * limit,
              })
              return ret.data
            },
          }}
          databasePickerProps={{
            enabled: true,
            fetcherDependencies: [dcserviceId, database.name],
            value: { name: database.name, display: database.display },
            onChange: (value) => {
              setDatabase(value)
              setTableDisplay(undefined)
              setPaginationParams({ page: 1, limit })
              sortAtom.set({})
              setSearchFilter({} as any)
              setTableParam(undefined)
            },
            fetchList: async ({ sort, searchFilter, page, limit }) => {
              const ret = await Dcservice.api.findDatabases.request({
                id: dcserviceId,
                sort,
                where: searchFilter as any,
                limit,
                offset: (page - 1) * limit,
              })
              return ret.data
            },
          }}
          tablePickerProps={{
            fetcherDependencies: [dcserviceId, database.name],
            enabled: !!database.name,
            value: { name: tableParam, schema: schemaParam, display: tableDisplay },
            onChange: (v) => {
              setTableParam(v?.name)
              setTableDisplay(v?.display)
              setSchemaParam(v?.schema)
              setPaginationParams({ page: 1, limit })
              sortAtom.set({})
              setSearchFilter({} as any)
            },
            fetchTableList: async ({ sort, searchFilter, page, limit }) => {
              const ret = await Dcservice.api.findTables.request({
                dcdatabaseLocator: {
                  dcserviceId,
                  name: database.name,
                },
                sort,
                where: searchFilter as any,
                limit,
                offset: (page - 1) * limit,
              })
              return ret.data
            },
          }}
          queryParams={{
            dcserviceId,
            table: tableParam,
            database: database.name,
            schema: schemaParam,
          }}
          uploadModalProps={{
            upload: async (file) => {
              const fileName = file.name.trim().replace(' ', '_')
              const response = await fileApi.upload.request({ file, fileName, bucketName: BUCKET_NAME })
              processingApi.excelToTable.request({
                fileNames: [response.data.fileName],
                bucketName: BUCKET_NAME,
                dcserviceId,
                table: tableParam || '',
                database: database.name || '',
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
              const isLatin = props.context.displayOptions?.[props.column.name]?.highlight?.latin
              const isCyrillic = props.context.displayOptions?.[props.column.name]?.highlight?.cyrillic
              const isPunctuationMarks = props.context.displayOptions?.[props.column.name]?.highlight?.punctuationMarks
              if (isLatin || isCyrillic || isPunctuationMarks) {
                let value: HeighlightPart[] = [{ type: undefined, str: String(props.value) }]
                value = isLatin
                  ? value.flatMap((v) => (v.type === undefined ? highlightText(v.str, /[a-zA-Z]+/g, 'latin') : v))
                  : value

                value = isCyrillic
                  ? value.flatMap((v) => (v.type === undefined ? highlightText(v.str, /[а-яА-Я]+/g, 'cyrillic') : v))
                  : value

                value = isPunctuationMarks
                  ? value.flatMap((v) =>
                      v.type === undefined
                        ? highlightText(v.str, /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]/g, 'punctuationMarks')
                        : v,
                    )
                  : value

                return value.map((h, i) =>
                  h.type === undefined ? (
                    h.str
                  ) : (
                    <Text
                      size='2'
                      color={h.type === 'latin' ? 'red' : h.type === 'cyrillic' ? 'green' : 'blue'}
                      key={i}
                    >
                      {h.str}
                    </Text>
                  ),
                )
              }
              if (props.column.type === 'sql') {
                return (
                  <Editor
                    value={String(props.value)}
                    height='10rem'
                    language='sql'
                    options={{
                      readOnly: true,
                      stickyScroll: { enabled: false },
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
            columns: mutatedColumns,
            list: rowsFetcher.data?.items || [],
            getRowProps: ({ item }) => {
              if (!primaryKeyFetcher.data && !primaryKeyFetcher.isFetching) return {}
              return {
                onClick: () => {
                  isUpdateFormModalOpen.set(true)
                  updateRowForm.initialize(item)
                },
              }
            },
            paginationProps: {
              onLimitChange: (limit) => setPaginationParams({ page: 1, limit }),
              limit,
              limitOptions: [10, 25, 50, 100],
              totalElements: rowsFetcher.data?.total,
              loading: rowsFetcher.isFetching,
              currentPage: page,
              onChange: (page) => setPaginationParams({ page, limit }),
            },
            context: {
              displayOptions,
              setSearchFilter: setSearchFilter as any,
              searchFilter: columnSearchParams,
              sortAtom: sortAtom,
              selectedItemsAtom:
                primaryKeyFetcher.data && !primaryKeyFetcher.isFetching ? selectedItemsAtom : undefined,
              renderDropdownMenuContent: (props) => {
                const isSql = Boolean(displayOptions[props.column.name]?.column?.type === 'sql')
                const isLatin = Boolean(displayOptions[props.column.name]?.highlight?.latin)
                const isCyrillic = Boolean(displayOptions[props.column.name]?.highlight?.cyrillic)
                const isPunctuationMarks = Boolean(displayOptions[props.column.name]?.highlight?.punctuationMarks)

                return (
                  <DropdownMenu.Content>
                    <DropdownMenu.Item
                      onClick={() => {
                        if ((props.column as any)?.attributes?.partitioning) {
                          Dccolumn.api.upsertByLocator
                            .request({
                              input: {
                                name: props.column.name,
                                display: '',
                                database: database.name,
                                dcserviceId,
                                table: tableParam,
                                schema: schemaParam,
                                attributes: {
                                  partitioning: false,
                                },
                              },
                            })
                            .then(() => rowsFetcher.refetch())
                        } else {
                          Promise.all(
                            mutatedColumns?.map((column) => {
                              Dccolumn.api.upsertByLocator.request({
                                input: {
                                  name: column.name,
                                  display: '',
                                  database: database.name,
                                  dcserviceId,
                                  table: tableParam,
                                  schema: schemaParam,
                                  attributes: {
                                    partitioning: column.name === props.column.name,
                                  },
                                },
                              })
                            }) || [],
                          ).then(() => rowsFetcher.refetch())
                        }
                      }}
                    >
                      Партицировать по колонке
                      <Checkbox checked={(props.column as any)?.attributes?.partitioning} />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        if (isSql) {
                          // Находим изначальную колонку
                          const column = tableMeta?.columns.find((c) => c.name === props.column.name)
                          assertDefined(column, 'Невозможная ошибка')
                          // Возвращаем изначальный тип
                          setDisplayOptions({
                            ...displayOptions,
                            [props.column.name]: { column: { type: column.type } },
                          })
                        } else {
                          setDisplayOptions({ ...displayOptions, [props.column.name]: { column: { type: 'sql' } } })
                        }
                      }}
                    >
                      SQL
                    </DropdownMenu.Item>
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>Подсветить</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item
                          onClick={() => {
                            setDisplayOptions((s) =>
                              setPath(s, [props.column.name, 'highlight', 'cyrillic'], !isCyrillic),
                            )
                          }}
                        >
                          Кириллицу
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          onClick={() => {
                            setDisplayOptions((s) => setPath(s, [props.column.name, 'highlight', 'latin'], !isLatin))
                          }}
                        >
                          Латиницу
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          onClick={() => {
                            setDisplayOptions((s) =>
                              setPath(s, [props.column.name, 'highlight', 'punctuationMarks'], !isPunctuationMarks),
                            )
                          }}
                        >
                          Знаки препинания
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                )
              },
            },
          }}
        />
      </Container>
    </Main>
  )

  /**
   * Private
   */

  // Мутирует колонки для Формы редактирования строки
  function _mutateColumns() {
    return (
      rowsFetcher?.data?.columns.map((c) => {
        return { ...c, ...displayOptions[c.name]?.column }
      }) || []
    )
  }
}

Component.displayName = NAME

/**
 * Private
 */

type HeighlightPart = {
  str: string
  type: string | undefined
}

function highlightText(code: string, regexp: RegExp, type: string): HeighlightPart[] {
  const parts: HeighlightPart[] = []
  let lastIndex = 0

  let match
  while ((match = regexp.exec(code)) !== null) {
    const matched = match[0]
    const startIndex = match.index
    const endIndex = regexp.lastIndex

    // Add text before the matched word
    if (startIndex > lastIndex) {
      parts.push({ type: undefined, str: code.substring(lastIndex, startIndex) })
    }

    // Add the highlighted matched word
    parts.push({ type, str: matched })

    lastIndex = endIndex
  }

  // Add any remaining text after the last matched word
  if (lastIndex < code.length) {
    parts.push({ type: undefined, str: code.substring(lastIndex) })
  }

  return parts
}

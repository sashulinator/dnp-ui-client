import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NumberParam, StringParam, withDefault } from 'serialize-query-params'
import { useQueryParam, useQueryParams } from 'use-query-params'

import { routes } from '~/app/route'
import { type Row, SYSNAME, api } from '~/entities/dictionary-table'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import { type Column as DatabaseColumn, RowForm } from '~/shared/database'
import Dialog, { ConfirmDialog, createDialogStore } from '~/shared/dialog'
import { type Item, Viewer } from '~/shared/explorer'
import Flex from '~/shared/flex'
import FForm, { type FormApi, useCreateForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { notify } from '~/shared/notification-list-store'
import { Heading, Pagination } from '~/shared/page'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import { useSearch } from '~/shared/search'
import Section from '~/shared/section'
import { useSort } from '~/shared/sort'
import {
  Column,
  ListTable,
  SearchColumn,
  type SearchColumnTypes,
  SortColumn,
  type SortColumnTypes,
} from '~/shared/table'
import '~/shared/table'
import TextField from '~/shared/text-field'
import { JSONParam } from '~/shared/use-query-params'
import { createActionColumn } from '~/shared/working-table'
import { createSelectionColumn } from '~/shared/working-table/lib/selection-action-column'
import type { Any } from '~/utils/core'
import { type SetterOrUpdater, c, isEmpty } from '~/utils/core'
import { type Dictionary } from '~/utils/core'
import { useRenderDelay } from '~/utils/core-hooks/render-delay'
import { get, remove } from '~/utils/dictionary'

type TableContext = SearchColumnTypes.Context<Item['data']> &
  SortColumnTypes.Context<Item['data']> & { idKey: string } & {
    selectedItems: Dictionary<Dictionary>
    setSelectedItems: SetterOrUpdater<Dictionary<Dictionary>>
  }

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id_explorer`

export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()
  const [nameQueryParam] = useQueryParam('name', withDefault(StringParam, ''))
  const [searchQueryParam, searchValue, setSearchValue] = useSearch()
  const [sortParam, sortValue, setSort] = useSort()

  const confirmDialogStore = useMemo(() => createDialogStore(), [])

  const [itemToRemove, setItemToRemove] = useState<Dictionary | null>(null)
  const [removingitems, setRemovingItems] = useState<Dictionary<Dictionary>>({})
  const [selectedItems, setSelectedItems] = useState<Dictionary<Dictionary>>({})
  const [isSelectedDialogOpen, setIsSelectedDialogOpen] = useState(false)

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      take: withDefault(NumberParam, 10),
    },
    { removeDefaultsFromUrl: true },
  )

  const tableRenderDelay = useRenderDelay(TICK_MS * 4)
  const [columnSearchParams, setColumnSearchParams] = useQueryParam<
    string,
    SearchColumnTypes.ReplaceValueByFilter<Item['data']>
  >('columnSearch', JSONParam as Any)

  const requestParams = {
    kn,
    where: { ...columnSearchParams },
    skip: (page - 1) * take,
    take,
    sort: sortParam,
    searchQuery: { startsWith: searchQueryParam || null },
  }

  const explorerListFetcher = api.explorer.findManyAndCountRows.useCache(requestParams, {
    keepPreviousData: true,
    staleTime: 10_000,
  })
  const { dictionaryTable, explorer } = explorerListFetcher.data || {}

  const uiColumns = useMemo(buildUiColumns, [dictionaryTable])
  const selectedUiColumns = useMemo(buildSelectedUiColumns, [dictionaryTable])

  const explorerCreateMutator = api.explorer.createRow.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
      explorerListFetcher.refetch()
      formToCreate.initialize({})
      setFormToCreateOpen(false)
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerRemoveMutator = api.explorer.deleteRow.useCache({
    onSuccess: () => {
      notify({ title: 'Удалено', type: 'success' })
      explorerListFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerUpdateMutator = api.explorer.updateRow.useCache({
    onSuccess: () => {
      notify({ title: 'Обновлено', type: 'success' })
      explorerListFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const formToCreate = useCreateRowForm({
    onSubmit: (values) => explorerCreateMutator.mutateAsync({ kn, input: values }).then((res) => res.data),
  })
  const [formToCreateOpen, setFormToCreateOpen] = useState(false)

  const formToUpdate = useCreateRowForm({
    onSubmit: (values) =>
      explorerUpdateMutator
        .mutateAsync({ kn, input: values, where: { [explorer!.idKey!]: values[explorer!.idKey!] as string } })
        .then((res) => res.data),
  })

  const indexedColumns = dictionaryTable?.tableSchema.items.filter((item) => item.index || item.primary)

  const selectedCount = Object.keys(selectedItems).length

  return (
    <main className={NAME} key={kn}>
      <Dialog.Root open={isSelectedDialogOpen}>
        <Dialog.Content maxWidth='1224px'>
          <Dialog.Title>
            <Flex gap='1' align='center' justify='between'>
              Выделенные{' '}
              <Button round={true} variant='ghost' onClick={() => setIsSelectedDialogOpen(false)}>
                <Icon name='Cross1' />
              </Button>
            </Flex>
          </Dialog.Title>

          <ScrollArea scrollbars='horizontal'>
            <ListTable context={{}} columns={selectedUiColumns} list={Object.values(selectedItems)} />
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
      <ConfirmDialog
        store={confirmDialogStore}
        title='Удалить запись?'
        description='Вы уверены, что хотите удалить запись?'
        onConfirm={() => {
          if (itemToRemove) {
            const id = itemToRemove?.[explorer!.idKey] as string
            removeRows({ [id]: itemToRemove as Dictionary })
            setItemToRemove(null)
            setRemovingItems((removingItems) => ({
              ...removingItems,
              [get(itemToRemove, explorer?.idKey) as string]: itemToRemove,
            }))
          }
          if (!isEmpty(selectedItems)) {
            removeRows(selectedItems)
            setRemovingItems(selectedItems)
            setSelectedItems({})
          }
          confirmDialogStore.getState().close()
        }}
        onClose={() => {
          setItemToRemove(null)
          confirmDialogStore.getState().close()
        }}
      />
      <_Dialog
        form={formToCreate}
        open={formToCreateOpen}
        mutator={explorerCreateMutator}
        columns={dictionaryTable?.tableSchema.items}
      />
      <_Dialog
        form={formToUpdate}
        open={!isEmpty(formToUpdate.getState().initialValues)}
        mutator={explorerUpdateMutator}
        columns={dictionaryTable?.tableSchema.items}
      />
      <Container p='var(--space-4)'>
        <Section size='1' className={c(cssAnimations.Appear)}>
          <Flex width='100%' justify='between'>
            <Heading.Root
              loading={explorerListFetcher.isFetching}
              route={routes.dictionaryTables_explorerFindManyAndCount}
              backRoute={routes.dictionaryTables_findManyAndCount}
              renderIcon={routes.dictionaryTables_findManyAndCount.payload.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Unique
                string={dictionaryTable?.name ?? nameQueryParam}
                tooltipContent={routes.dictionaryTables_explorerFindManyAndCount.getName()}
              />
            </Heading.Root>
            <Flex>
              <Button
                onClick={() => {
                  formToCreate.initialize({})
                  setFormToCreateOpen(true)
                }}
              >
                Создать
              </Button>
            </Flex>
          </Flex>
        </Section>

        <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 2}ms` }}>
          <Flex width='50%' direction='column'>
            <TextField.Root
              placeholder={`Индексы: ${indexedColumns?.map((item) => item.name).join(', ') || '∞'}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size='3'
              type='search'
            />
          </Flex>
        </Section>

        <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
          <Pagination
            currentPage={page}
            limit={take}
            loading={!explorer ? false : explorerListFetcher.isFetching}
            totalElements={explorer?.total}
            onChange={(page) => setPaginationParams({ page })}
          />
        </Section>

        {tableRenderDelay.isRender && (
          <Section size='1'>
            <Flex style={{ position: 'relative' }}>
              {selectedCount > 0 && (
                <Flex gap='4' justify='end' pr='3' style={{ position: 'absolute', top: '-1.5rem', left: '0' }}>
                  <Flex width='34px' justify='center' align='center'>
                    <Button onClick={() => setIsSelectedDialogOpen(true)} size='1' variant='ghost'>
                      {selectedCount}
                    </Button>
                  </Flex>
                  <Button
                    onClick={() => confirmDialogStore.getState().open()}
                    variant='ghost'
                    disabled={Object.keys(selectedItems).length === 0}
                  >
                    Удалить
                  </Button>
                </Flex>
              )}
              <FetcherStatus
                isChildrenOnFetchingVisible={true}
                isLoading={explorerListFetcher.isLoading}
                isFetching={explorerListFetcher.isFetching}
                isError={explorerListFetcher.isError}
                error={explorerListFetcher.error?.response?.data}
                refetch={explorerListFetcher.refetch}
              >
                <ScrollArea scrollbars='horizontal'>
                  <Viewer.Root
                    loading={explorerListFetcher.isFetching}
                    paths={explorer?.paths || []}
                    explorer={explorer}
                  >
                    <Viewer.ListTable<Item, TableContext>
                      className={c(cssAnimations.Appear)}
                      columns={uiColumns}
                      rowProps={({ item, rowIndex }) => {
                        const value = get(item, explorer?.idKey) as string
                        const isRemoving = Boolean(removingitems[value])
                        return {
                          className: c(cssAnimations.Appear),
                          style: {
                            animationDelay: `${TICK_MS * Math.pow(rowIndex, 0.5)}ms`,
                            backgroundColor: isRemoving ? 'var(--red-9)' : undefined,
                            transition: isRemoving ? 'background-color 300ms' : undefined,
                          },
                          onDoubleClick: () => formToUpdate.initialize(item),
                        }
                      }}
                      context={{
                        idKey: explorer?.idKey as string,
                        selectedItems,
                        setSelectedItems,
                        sort: sortValue,
                        setSort,
                        searchFilter: columnSearchParams,
                        setSearchFilter: (value) => {
                          const newValue = typeof value === 'function' ? value(columnSearchParams) : value
                          setColumnSearchParams(newValue)
                        },
                      }}
                    />
                  </Viewer.Root>
                </ScrollArea>
              </FetcherStatus>
            </Flex>
          </Section>
        )}
      </Container>
    </main>
  )

  function buildSelectedUiColumns() {
    if (dictionaryTable?.tableSchema.items === undefined) return []

    const columns = dictionaryTable.tableSchema.items.map((column) => Column.fromDatabaseColumn(column))

    const actionsColumn = createActionColumn({
      renderHeader: () => '',
      headerProps: { maxWidth: '24px' },
      cellProps: { maxWidth: '24px' },
      onCrossClick: (_, item) => {
        setSelectedItems((items) => remove(items, item[explorer?.idKey as string] as string))
      },
    })
    return [actionsColumn, ...columns]
  }

  function buildUiColumns() {
    if (dictionaryTable?.tableSchema.items === undefined) return []

    const columns = dictionaryTable.tableSchema.items.map((column) =>
      Column.fromDatabaseColumn<Item['data'], TableContext>(column),
    )
    const searchColumns = columns.map(SearchColumn.toSearchColumn)
    const sortColumns = searchColumns.map(SortColumn.toSortColumn)

    const actionsColumn = createActionColumn({
      onTrashClick: (_, item) => {
        setItemToRemove(item)
        confirmDialogStore.getState().open()
      },
      onEditClick: (_, item) => {
        formToUpdate.initialize(item as Item['data'])
      },
    })
    const selectionColumn = createSelectionColumn()
    return [selectionColumn, ...sortColumns, actionsColumn]
  }

  async function removeRows(items: Dictionary<Dictionary>): Promise<void> {
    const whereIds = Object.values(items).map((item) => ({
      [explorer!.idKey!]: item[explorer!.idKey] as string,
    }))

    explorerRemoveMutator.mutate({
      kn,
      where: { OR: whereIds },
    })
  }
}

Component.displayName = NAME

/**
 * Private
 */

interface _DialogProps {
  open: boolean
  form: FormApi<Row, Partial<Row>>
  columns: DatabaseColumn[] | undefined
  mutator: { isLoading: boolean }
}

function _Dialog(props: _DialogProps) {
  const { open, form, columns, mutator } = props

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>
          Запись
          {/* <TextHighlighter>{item?.name}</TextHighlighter> */}
        </Dialog.Title>
        <FForm form={form} columns={columns} component={RowForm} />
        <Flex gap='4' mt='4' justify='end'>
          <Button variant='soft' color='gray' onClick={() => form.initialize({})}>
            Закрыть
          </Button>
          <Button
            loading={mutator.isLoading}
            disabled={!form.getState().dirty || form.getState().invalid}
            onClick={form.submit}
          >
            Сохранить
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

interface useCreateRowFormProps {
  onSubmit: (values: Row) => Promise<unknown>
}

function useCreateRowForm(props: useCreateRowFormProps) {
  return useCreateForm<Row>(
    {
      onSubmit: (values) => {
        props.onSubmit(values)
      },
      initialValues: {},
    },
    { values: true, initialValues: true },
  )
}

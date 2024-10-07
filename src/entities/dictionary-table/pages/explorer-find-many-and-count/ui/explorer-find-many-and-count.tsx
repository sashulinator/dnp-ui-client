import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NumberParam, StringParam, withDefault } from 'serialize-query-params'
import { useQueryParam, useQueryParams } from 'use-query-params'

import { routes } from '~/app/route'
import { type Row, SYSNAME, api } from '~/entities/dictionary-table'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import { type Column, RowForm, toColumns } from '~/shared/database-table'
import Dialog, { ConfirmDialog } from '~/shared/dialog'
import { Viewer } from '~/shared/explorer'
import Flex from '~/shared/flex'
import FForm, { type FormApi, useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Heading, Pagination } from '~/shared/page'
import ScrollArea from '~/shared/scroll-area'
import { useSearch } from '~/shared/search'
import Section from '~/shared/section'
import { useSort } from '~/shared/sort'
import Text from '~/shared/text'
import TextField from '~/shared/text-field'
import { JSONParam } from '~/shared/use-query-params'
import { createActionColumn } from '~/shared/working-table'
import { createSelectionColumn } from '~/shared/working-table/lib/selection-action-column'
import { c, isEmpty } from '~/utils/core'
import { type Dictionary } from '~/utils/core'
import { useRenderDelay } from '~/utils/core-hooks/render-delay'

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id_explorer`

export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()
  const [nameQueryParam] = useQueryParam('name', withDefault(StringParam, ''))
  const [searchQueryParam, searchValue, setSearchValue] = useSearch()
  const [sortParam, sortValue, setSort] = useSort()

  const [isConfirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState<Dictionary | null>(null)
  const [removingitems, setRemovingItems] = useState<Dictionary<Dictionary>>({})
  const [selectedItems, setSelectedItems] = useState<Dictionary<Dictionary>>({})

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      take: withDefault(NumberParam, 10),
    },
    { removeDefaultsFromUrl: true },
  )

  const tableRenderDelay = useRenderDelay(TICK_MS * 4)
  const [columnSearchParams, setColumnSearchParams] = useQueryParam('columnSearch', JSONParam)

  const requestParams = {
    kn,
    where: { ...columnSearchParams },
    skip: (page - 1) * take,
    take,
    sort: sortParam,
    searchQuery: { startsWith: searchQueryParam },
  }

  const explorerListFetcher = api.explorer.findManyAndCountRows.useCache(requestParams, {
    keepPreviousData: true,
    staleTime: 10_000,
  })
  const { dictionaryTable, explorer } = explorerListFetcher.data || {}

  const uiColumns = useMemo(buildUiColumns, [dictionaryTable])

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
    onSuccess: (data) => {
      api.explorer.findManyAndCountRows.setCache.replaceExplorerItem(requestParams, data.data.row)
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const formToCreate = useCreateRowForm({
    onSubmit: (values) => explorerCreateMutator.mutateAsync({ kn, input: values }).then((res) => res.data),
  })
  const [formToCreateOpen, setFormToCreateOpen] = useState(false)

  const formToUpdate = useCreateRowForm({
    onSubmit: (values) =>
      explorerUpdateMutator.mutateAsync({ kn, input: values, where: { _id: values._id } }).then((res) => res.data),
  })

  const indexedColumns = dictionaryTable?.tableSchema.items.filter((item) => item.index || item.primary)

  const selectedCount = Object.keys(selectedItems).length

  return (
    <main className={NAME} key={kn}>
      <ConfirmDialog
        open={isConfirmDeleteDialogOpen}
        onConfirm={() => {
          if (itemToRemove) {
            const id = itemToRemove?.[explorer!.idKey] as string
            removeRows({ [id]: itemToRemove as Dictionary })
            setItemToRemove(null)
            setRemovingItems((removingItems) => ({
              ...removingItems,
              // @ts-ignore
              [itemToRemove[explorer?.idKey as string]]: itemToRemove,
            }))
          }
          if (!isEmpty(selectedItems)) {
            removeRows(selectedItems)
            setRemovingItems(selectedItems)
            setSelectedItems({})
          }
          setConfirmDeleteDialogOpen(false)
        }}
        title='Удалить запись?'
        description='Вы уверены, что хотите удалить эту запись?'
        onClose={() => setItemToRemove(null)}
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
                  <Flex width='44px' justify='center' align='center'>
                    <Text size='1' color='gray'>
                      {selectedCount}
                    </Text>
                  </Flex>
                  <Button
                    onClick={() => setConfirmDeleteDialogOpen(true)}
                    variant='ghost'
                    disabled={Object.keys(selectedItems).length === 0}
                  >
                    Удалить
                  </Button>
                </Flex>
              )}
              <ScrollArea scrollbars='horizontal'>
                <Viewer.Root
                  error={explorerListFetcher.error?.response?.data}
                  loading={explorerListFetcher.isFetching}
                  paths={explorer?.paths || []}
                  explorer={explorer}
                >
                  <Viewer.ListTable
                    className={c(cssAnimations.Appear)}
                    rowProps={({ item, rowIndex }) => {
                      // @ts-ignore
                      const isRemoving = Boolean(removingitems[item[explorer?.idKey]])
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
                      idKey: explorer?.idKey,
                      selectedItems,
                      setSelectedItems,
                      sort: sortValue,
                      setSort,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      searchFilter: columnSearchParams as any,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      setSearchFilter: setColumnSearchParams as any,
                    }}
                    columns={uiColumns as any}
                  />
                </Viewer.Root>
              </ScrollArea>
            </Flex>
          </Section>
        )}
      </Container>
    </main>
  )

  function buildUiColumns() {
    if (dictionaryTable?.tableSchema.items === undefined) return []

    const uiColumns = toColumns(dictionaryTable.tableSchema.items || [])
    const actionsColumn = createActionColumn({ onTrashClick: setItemToRemove })
    const selectionColumn = createSelectionColumn()
    return [selectionColumn, ...uiColumns, actionsColumn]
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
  columns: Column[] | undefined
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

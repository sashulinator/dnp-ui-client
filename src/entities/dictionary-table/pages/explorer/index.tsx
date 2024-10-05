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
import Dialog from '~/shared/dialog'
import { Viewer } from '~/shared/explorer'
import Flex from '~/shared/flex'
import FForm, { type FormApi, useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Heading, Pagination } from '~/shared/page'
import ScrollArea from '~/shared/scroll-area'
import { useSearch } from '~/shared/search'
import Section from '~/shared/section'
import { useSort } from '~/shared/sort'
import TextField from '~/shared/text-field'
import { JSONParam } from '~/shared/use-query-params'
import { c, isEmpty } from '~/utils/core'
import { useRenderDelay } from '~/utils/core-hooks/render-delay'

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id_explorer`

/**
 * Fix: при переходе из одного словаря в другой
 * реакт воспринимает это как ререндеринг компонента
 * а не как переход на другую страницу
 **/
export default function Component() {
  const { kn = '' } = useParams<{ kn: string }>()
  return <_Component key={kn} />
}

export function _Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()
  const [nameQueryParam] = useQueryParam('name', withDefault(StringParam, ''))
  const [searchQueryParam, searchValue, setSearchValue] = useSearch()
  const [sortParam, sortValue, setSort] = useSort()

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

  const columns = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => toColumns((explorerListFetcher.data?.dictionaryTable.tableSchema.items as any) || []),
    [explorerListFetcher.data],
  )

  const explorerCreateMutator = api.explorer.createRow.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
      explorerListFetcher.refetch()
      formToCreate.initialize({})
      setFormToCreateOpen(false)
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  // const explorerRemoveMutator = api.explorer.deleteRow.useCache({
  //   onSuccess: () => {
  //     notify({ title: 'Удалено', type: 'success' })
  //     explorerListFetcher.refetch()
  //   },
  //   onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  // })

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

  const indexedColumns = explorerListFetcher.data?.dictionaryTable.tableSchema.items.filter(
    (item) => item.index || item.primary,
  )

  return (
    <main className={NAME} key={kn}>
      <_Dialog
        form={formToCreate}
        open={formToCreateOpen}
        mutator={explorerCreateMutator}
        columns={explorerListFetcher.data?.dictionaryTable.tableSchema.items}
      />
      <_Dialog
        form={formToUpdate}
        open={!isEmpty(formToUpdate.getState().initialValues)}
        mutator={explorerUpdateMutator}
        columns={explorerListFetcher.data?.dictionaryTable.tableSchema.items}
      />
      <Container p='var(--space-4)'>
        <Section size='1' className={c(cssAnimations.Appear)}>
          <Flex width='100%' justify='between'>
            <Heading.Root
              loading={explorerListFetcher.isFetching}
              route={routes.dictionaryTables_kn_explorer}
              backRoute={routes.dictionaryTables}
              renderIcon={routes.dictionaryTables.payload.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Unique
                string={explorerListFetcher.data?.dictionaryTable.name ?? nameQueryParam}
                tooltipContent={routes.dictionaryTables_kn_explorer.getName()}
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
            loading={!explorerListFetcher.data ? false : explorerListFetcher.isFetching}
            totalElements={explorerListFetcher.data?.explorer.total}
            onChange={(page) => setPaginationParams({ page })}
          />
        </Section>

        {tableRenderDelay.isRender && (
          <Section size='1'>
            <ScrollArea scrollbars='horizontal'>
              <Viewer.Root
                error={explorerListFetcher.error?.response?.data}
                loading={explorerListFetcher.isFetching}
                paths={explorerListFetcher.data?.explorer.paths || []}
                explorer={explorerListFetcher?.data?.explorer}
              >
                <Viewer.ListTable
                  className={c(cssAnimations.Appear)}
                  rowProps={({ item, rowIndex }) => ({
                    className: cssAnimations.Appear,
                    style: {
                      animationDelay: `${TICK_MS * Math.pow(rowIndex, 0.5)}ms`,
                    },
                    onDoubleClick: () => formToUpdate.initialize(item),
                  })}
                  context={{
                    sort: sortValue,
                    setSort,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    searchFilter: columnSearchParams as any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setSearchFilter: setColumnSearchParams as any,
                  }}
                  columns={columns as any}
                />
              </Viewer.Root>
            </ScrollArea>
          </Section>
        )}
      </Container>
    </main>
  )
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

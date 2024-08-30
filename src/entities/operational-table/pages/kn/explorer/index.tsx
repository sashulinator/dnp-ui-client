import { Dialog } from '@radix-ui/themes'

import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { NumberParam, withDefault } from 'serialize-query-params'
import { useQueryParams } from 'use-query-params'

import { type Row, type TableSchema, api } from '~/entities/operational-table'
import ExplorerViewer from '~/entities/operational-table/ui/explorer-viewer'
import { SchemaForm, toColumns } from '~/entities/table-schema'
import { useSearch } from '~/lib/search-query-params'
import { notify } from '~/shared/notification-list-store'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { FormApi, useCreateForm } from '~/ui/form'
import Heading from '~/ui/layout/variants/heading'
import Pagination from '~/ui/pagination'
import ScrollArea from '~/ui/scroll-area'
import Section from '~/ui/section'
import TextField from '~/ui/text-field'
import { Id, isEmpty } from '~/utils/core'
import { uncapitalize, unspace } from '~/utils/string'

import { NAME_ONE as ENTITY_NAME } from '../../../constants/name'

export interface Props {
  className?: string | undefined
}

const NAME = `${uncapitalize(unspace(ENTITY_NAME))}-Page_id_explorer`

/**
 * operationalTable-Page_id_explorer
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const [searchQueryParam, searchValue, setSearchValue] = useSearch()

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const explorerListFetcher = api.explorerFetchList.useCache(
    { kn, skip: (page - 1) * take, take, searchQuery: searchQueryParam ? `${searchQueryParam}%` : '' },
    { keepPreviousData: true },
  )

  const columns = useMemo(
    () => toColumns(explorerListFetcher.data?.operationalTable.tableSchema.items || []),
    [explorerListFetcher.data],
  )

  const explorerCreateMutator = api.explorerCreate.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
      explorerListFetcher.refetch()
      formToCreate.initialize({})
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerRemoveMutator = api.explorerRemove.useCache({
    onSuccess: () => {
      notify({ title: 'Удалено', type: 'success' })
      explorerListFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerUpdateMutator = api.explorerUpdate.useCache({
    onSuccess: () => {
      notify({ title: 'Сохранено', type: 'success' })
      explorerListFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const formToCreate = useCreateRowForm({
    onSubmit: (values) => explorerCreateMutator.mutateAsync({ kn, input: values }).then((res) => res.data),
  })

  const formToUpdate = useCreateRowForm({
    onSubmit: (values) =>
      explorerUpdateMutator.mutateAsync({ kn, input: values, where: { _id: values._id } }).then((res) => res.data),
  })

  const indexedColumns = explorerListFetcher.data?.operationalTable.tableSchema.items.filter((item) => item.index)

  return (
    <main className={NAME}>
      <_Dialog
        form={formToCreate}
        open={!isEmpty(formToCreate.getState().initialValues)}
        mutator={explorerCreateMutator}
        tableSchema={explorerListFetcher.data?.operationalTable.tableSchema}
      />
      <_Dialog
        form={formToUpdate}
        open={!isEmpty(formToUpdate.getState().initialValues)}
        mutator={explorerUpdateMutator}
        tableSchema={explorerListFetcher.data?.operationalTable.tableSchema}
      />
      <Container p='1.5rem'>
        {explorerListFetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => explorerListFetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!explorerListFetcher.isError && (
          <Section size='1'>
            <Flex width='100%' justify='between'>
              <Heading.Root
                loading={explorerListFetcher.isFetching}
                route={routes.operationalTables_kn_explorer}
                backRoute={routes.operationalTables}
                renderIcon={routes.operationalTables.renderIcon}
              >
                <Heading.BackToParent />
                <Heading.Uniq
                  string={explorerListFetcher.data?.operationalTable.name}
                  tooltipContent={routes.operationalTables_kn_explorer.getName()}
                />
              </Heading.Root>
              <Button
                onClick={() =>
                  formToCreate.initialize({
                    _status: '0',
                  })
                }
              >
                Сохранить
              </Button>
            </Flex>
          </Section>
        )}

        {indexedColumns?.length !== 0 && (
          <Section size='1'>
            <Flex width='50%' direction='column'>
              <TextField.Root
                placeholder={`Индексы: ${indexedColumns?.map((item) => item.name).join(', ')}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                size='3'
                type='search'
              />
            </Flex>
          </Section>
        )}

        <Section size='1'>
          <Pagination
            currentPage={page}
            limit={take}
            loading={explorerListFetcher.isFetching}
            totalElements={explorerListFetcher.data?.explorer.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>

        {explorerListFetcher.isSuccess && (
          <Section size='1'>
            <ScrollArea>
              <ExplorerViewer
                loading={explorerListFetcher.isFetching}
                onPathChange={(paths) => {
                  const last = paths[paths.length - 1]
                  const item = explorerListFetcher.data.explorer.items.find((item) => item.name === last.name)
                  if (!item) return
                  formToUpdate.initialize(item.data)
                }}
                remove={(_id: Id) => explorerRemoveMutator.mutateAsync({ kn, where: { _id } }).then((res) => res.data)}
                update={(row: Row) =>
                  explorerUpdateMutator.mutateAsync({ kn, input: row, where: { _id: row._id } }).then((res) => res.data)
                }
                paths={explorerListFetcher.data.explorer.paths}
                data={explorerListFetcher.data.explorer}
                columns={columns}
              />
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
  tableSchema: TableSchema | undefined
  mutator: { isLoading: boolean }
}

function _Dialog(props: _DialogProps) {
  const { open, form, tableSchema, mutator } = props

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>
          Запись
          {/* <TextHighlighter>{item?.name}</TextHighlighter> */}
        </Dialog.Title>

        <FForm form={form} tableSchema={tableSchema} component={SchemaForm} />

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

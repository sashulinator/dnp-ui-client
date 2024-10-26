import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NumberParam, StringParam, withDefault } from 'serialize-query-params'
import { useQueryParam, useQueryParams } from 'use-query-params'

import { routes } from '~dnp/app/route'
import { ExplorerViewer, type Row, SYSNAME, api } from '~dnp/entities/operational-table'
import { ImportOperationalTableModal } from '~dnp/entities/operational-table/ui/import-modal'
import { getRole } from '~dnp/entities/user'
import Button from '~dnp/shared/button'
import Checkbox from '~dnp/shared/checkbox'
import Container from '~dnp/shared/container'
import Dialog, { ErrorDialog, SuccessDialog } from '~dnp/shared/dialog'
import { filesApi } from '~dnp/shared/files-api'
import Flex from '~dnp/shared/flex'
import { type FormApi, useCreateForm } from '~dnp/shared/form'
import FForm from '~dnp/shared/form'
import { notify } from '~dnp/shared/notification-list-store'
import { Heading, Pagination } from '~dnp/shared/page'
import ScrollArea from '~dnp/shared/scroll-area'
import { useSearch } from '~dnp/shared/search'
import Section from '~dnp/shared/section'
import { HighlightedText } from '~dnp/shared/text'
import TextField from '~dnp/shared/text-field'
import { JSONParam } from '~dnp/shared/use-query-params'
import { type Column, RowForm, toColumns } from '~dnp/slices/database'
import { useSort } from '~dnp/slices/sort'
import { type Id, isEmpty } from '~dnp/utils/core'

import * as importApi from '../../api/explorer/import'

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id_explorer`

/**
 * operationalTable-Page_id_explorer
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()
  const role = getRole()

  const [nameQueryParam] = useQueryParam('name', withDefault(StringParam, ''))
  const [searchQueryParam, searchValue, setSearchValue] = useSearch()
  const [sortParam, sortValue, setSort] = useSort()

  const [showImportModal, setShowImportModal] = useState<boolean>(false)

  const [uploadedFileId, setUploadedFileId] = useState<string>()

  const [isApproveMode, setIsApproveMode] = useState(false)

  const [showImportSuccessPopup, setShowImportSuccessPopup] = useState<boolean>(false)

  const [showImportErrorPopup, setShowImportErrorPopup] = useState<boolean>(false)

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      take: withDefault(NumberParam, 10),
    },
    { removeDefaultsFromUrl: true },
  )

  const [columnSearchParams, setColumnSearchParams] = useQueryParam('columnSearch', JSONParam)

  const where = isApproveMode ? { OR: [{ _status: '1' }, { _status: '2' }, { _status: '3' }] } : {}

  const requestParams = {
    kn,
    where: { ...where, ...columnSearchParams },
    skip: (page - 1) * take,
    take,
    sort: sortParam,
    searchQuery: { startsWith: searchQueryParam },
  }

  const explorerListFetcher = api.explorer.findManyAndCountRows.useCache(requestParams, { keepPreviousData: true })

  const columns = useMemo(
    () => toColumns(explorerListFetcher.data?.operationalTable.columns || []),
    [explorerListFetcher.data],
  )

  const explorerCreateMutator = api.explorer.createRow.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
      explorerListFetcher.refetch()
      formToCreate.initialize({})
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
      api.explorer.findManyAndCountRows.setCache.replaceExplorerItem(requestParams as any, data.data.row)
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

  const fileUploadMutator = filesApi.upload.useCache({
    onSuccess: (data) => {
      setUploadedFileId(data.data.fileId)
    },
    onError: () => {
      notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' })
    },
  })

  fileUploadMutator.isError

  const onFileUpload = (file: File | null) => {
    if (file) {
      fileUploadMutator.mutate({ file })
    }
  }

  const importMutator = importApi.useCache({
    onSuccess: () => {
      setShowImportModal(false)
      setShowImportSuccessPopup(true)
    },
    onError: () => {
      notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' })
      setShowImportErrorPopup(true)
    },
  })

  const onSubmitImport = () => {
    uploadedFileId &&
      explorerListFetcher.data &&
      importMutator.mutate({
        fileId: uploadedFileId,
        tableName: kn,
        operationalTableId: explorerListFetcher.data?.operationalTable.kn,
      })
  }

  const onImportCancel = () => {
    setShowImportModal(false)
    setUploadedFileId(undefined)
  }

  useEffect(() => setSort({ _id: 'desc' }), [])

  const indexedColumns = explorerListFetcher.data?.operationalTable.columns.filter((item) => item.index)

  return (
    <main className={NAME}>
      <_Dialog
        form={formToCreate}
        open={!isEmpty(formToCreate.getState().initialValues)}
        mutator={explorerCreateMutator}
        columns={explorerListFetcher.data?.operationalTable.columns}
      />
      <_Dialog
        form={formToUpdate}
        open={!isEmpty(formToUpdate.getState().initialValues)}
        mutator={explorerUpdateMutator}
        columns={explorerListFetcher.data?.operationalTable.columns}
      />
      <ImportOperationalTableModal
        open={showImportModal}
        hasFile={!!uploadedFileId}
        isLoading={fileUploadMutator.isLoading || importMutator.isLoading}
        hasError={fileUploadMutator.isError}
        onFileUpload={onFileUpload}
        onSubmit={onSubmitImport}
        onClose={onImportCancel}
      />
      <Container p='var(--space-4)'>
        {explorerListFetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => explorerListFetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!explorerListFetcher.isError && (
          <Section size='1'>
            <Flex width='100%' justify='between'>
              <Heading.Root
                route={routes.operationalTables_kn_explorer}
                backRoute={routes.operationalTables}
                renderIcon={routes.operationalTables.payload.renderIcon}
              >
                <Heading.BackToParent />
                <Heading.Unique
                  string={explorerListFetcher.data?.operationalTable.name ?? nameQueryParam}
                  tooltipContent={routes.operationalTables_kn_explorer.getName()}
                />
              </Heading.Root>
              <Flex gapX='12px'>
                {role === 'Approver' && (
                  <Flex asChild={true} align='center' gap='2'>
                    <HighlightedText as='label' style={{ cursor: 'pointer' }} color={isApproveMode ? 'green' : 'blue'}>
                      Режим согласования
                      <Checkbox
                        variant='soft'
                        checked={isApproveMode}
                        onCheckedChange={(value) => setIsApproveMode(!!value)}
                      />
                    </HighlightedText>
                  </Flex>
                )}
                <Button variant='outline' onClick={() => setShowImportModal(true)}>
                  Импорт
                </Button>
                <Button onClick={() => formToCreate.initialize({ _status: '0' })}>Создать</Button>
              </Flex>
            </Flex>
          </Section>
        )}

        {indexedColumns?.length && (
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

        {explorerListFetcher.data && (
          <Section size='1'>
            <Pagination
              currentPage={page}
              limit={take}
              loading={explorerListFetcher.isFetching}
              totalElements={explorerListFetcher.data?.explorer.total}
              onChange={(page) => setPaginationParams({ page })}
            />
          </Section>
        )}

        {explorerListFetcher.isSuccess && (
          <Section size='1'>
            <ScrollArea>
              <ExplorerViewer
                loading={explorerListFetcher.isFetching}
                context={{
                  sort: sortValue,
                  setSort,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  searchFilter: columnSearchParams as any,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setSearchFilter: setColumnSearchParams as any,
                }}
                onPathChange={(paths) => {
                  const last = paths[paths.length - 1]
                  const item = explorerListFetcher.data.explorer.items.find((item) => {
                    const idKey = explorerListFetcher.data.explorer.idKey
                    return item.data[idKey as (typeof item.data)[keyof typeof item.data]] === last.name
                  })
                  if (!item) return
                  formToUpdate.initialize(item.data)
                }}
                remove={(_id: Id) =>
                  explorerRemoveMutator.mutateAsync({ kn, where: { _id: _id as string } }).then((res) => res.data)
                }
                update={(row: Row) =>
                  explorerUpdateMutator
                    .mutateAsync({ kn, input: row, where: { _id: row._id } })
                    .then((res) => res.data.row)
                }
                paths={explorerListFetcher.data.explorer.paths}
                explorer={explorerListFetcher.data.explorer}
                columns={columns}
              />
            </ScrollArea>
          </Section>
        )}
      </Container>
      <SuccessDialog
        open={showImportSuccessPopup}
        description='Импорт данных запущен. Статус операции можно отследить в разделе "Процессы"'
        onClose={() => setShowImportSuccessPopup(false)}
      />
      <ErrorDialog
        open={showImportErrorPopup}
        description='При запуске импорта произошла ошибка'
        onClose={() => setShowImportErrorPopup(false)}
      />
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

import { Dialog } from '@radix-ui/themes'
import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NumberParam, withDefault } from 'serialize-query-params'
import { useQueryParams } from 'use-query-params'
import { NAME_ONE as ENTITY_NAME } from '../../../constants/name'
import { Viewer } from '~/entities/explorer'
import { api } from '~/entities/operational-table'
import { SchemaTable, toColumns } from '~/entities/table-schema'
import { notify } from '~/shared/notification-list-store'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { useCreateForm } from '~/ui/form'
import Icon from '~/ui/icon'
import Heading from '~/ui/layout/variants/heading'
import Pagination from '~/ui/pagination'
import ScrollArea from '~/ui/scroll-area'
import Section from '~/ui/section'
import Spinner from '~/ui/spinner'
import { isEmpty } from '~/utils/core'
import { unspace, uncapitalize } from '~/utils/string'

export interface Props {
  className?: string | undefined
}

const NAME = `${uncapitalize(unspace(ENTITY_NAME))}-Page_id_explorer`

/**
 * operationalTable-Page_id_explorer
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const exploreFetcher = api.explorerFetchList.useCache(
    { kn, skip: (page - 1) * take, take },
    { keepPreviousData: true },
  )

  const columns = useMemo(() => {
    if (!exploreFetcher.data) return []
    const ret = toColumns(exploreFetcher.data.operationalTable.tableSchema.items)

    ret.push({
      key: '_status',
      renderHeader: () => 'Согласование',
      cellProps: { align: 'right' },
      headerProps: { align: 'right' },
      renderCell: ({ item }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any
        const [approved, setApproved] = useState((item.data as any)._status === '1')

        const explorerUpdateMutator = api.explorerUpdate.useCache({
          onSuccess: () => {
            setApproved((s) => !s)
          },
          onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
        })

        return (
          <Flex height='100%' width='100%' align='center' justify='end'>
            {explorerUpdateMutator.isLoading ? (
              <Spinner />
            ) : (
              <Button
                size={'1'}
                color={approved ? 'green' : 'red'}
                onClick={(e) => {
                  e.stopPropagation()

                  if (!exploreFetcher.data) return
                  explorerUpdateMutator.mutate({
                    kn: exploreFetcher.data?.operationalTable.kn,
                    input: {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      ...item.data,
                      _status: approved ? '0' : '1',
                    },
                  })
                }}
              >
                {approved ? 'Согласован' : 'Не согласован'}
              </Button>
            )}
          </Flex>
        )
      },
    })
    ret.push({
      key: 'action',
      renderHeader: () => 'Действия',
      cellProps: { width: '1rem', align: 'right' },
      headerProps: { align: 'right' },
      renderCell: ({ item }) => (
        <Button
          round={true}
          color='red'
          onClick={(e) => {
            e.stopPropagation()
            explorerRemoveMutator.mutate({
              kn: exploreFetcher.data?.operationalTable.kn,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              where: { id: item.data.id },
            })
          }}
        >
          <Icon name='Trash' />
        </Button>
      ),
    })
    return ret
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploreFetcher.data])

  const formToCreate = useCreateForm<Record<string, unknown>>(
    {
      onSubmit: (values) => {
        if (!exploreFetcher.data) return
        explorerCreateMutator.mutate({ kn: exploreFetcher.data?.operationalTable.kn, input: values })
      },
      initialValues: {},
    },
    { values: true, initialValues: true },
  )

  const formToUpdate = useCreateForm<Record<string, unknown>>(
    {
      onSubmit: (values) => {
        if (!exploreFetcher.data) return
        explorerUpdateMutator.mutate({ kn: exploreFetcher.data?.operationalTable.kn, input: values })
      },
      initialValues: {},
    },
    { values: true, initialValues: true },
  )

  const explorerCreateMutator = api.explorerCreate.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
      exploreFetcher.refetch()
      formToCreate.initialize({})
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerRemoveMutator = api.explorerRemove.useCache({
    onSuccess: () => {
      notify({ title: 'Удалено', type: 'success' })
      exploreFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerUpdateMutator = api.explorerUpdate.useCache({
    onSuccess: () => {
      notify({ title: 'Сохранено', type: 'success' })
      exploreFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const renderToCreate = useCallback(
    () => (exploreFetcher.data ? <SchemaTable tableSchema={exploreFetcher.data.operationalTable.tableSchema} /> : null),
    [exploreFetcher.data],
  )

  const itemToCreate = formToCreate.getState().values
  const itemToUpdate = formToUpdate.getState().values

  return (
    <main className={NAME}>
      <Dialog.Root open={!isEmpty(itemToCreate) || !isEmpty(itemToUpdate)}>
        <Dialog.Content maxWidth='450px'>
          <Dialog.Title>
            Запись
            {/* <TextHighlighter>{item?.name}</TextHighlighter> */}
          </Dialog.Title>

          <FForm form={isEmpty(itemToCreate) ? formToUpdate : formToCreate} render={renderToCreate} />

          <Flex gap='4' mt='4' justify='end'>
            <Button
              variant='soft'
              color='gray'
              onClick={() => {
                formToCreate.initialize({})
                formToUpdate.initialize({})
              }}
            >
              Закрыть
            </Button>
            <Button
              loading={explorerCreateMutator.isLoading}
              disabled={
                isEmpty(itemToCreate)
                  ? !formToUpdate.getState().dirty || formToUpdate.getState().invalid
                  : !formToCreate.getState().dirty || formToCreate.getState().invalid
              }
              onClick={() => {
                if (isEmpty(itemToCreate)) {
                  formToUpdate.submit()
                } else {
                  formToCreate.submit()
                }
              }}
            >
              Сохранить
            </Button>
          </Flex>
        </Dialog.Content>

        <Container p='1.5rem'>
          {exploreFetcher.isError && (
            <Flex width='100%' justify='center' gap='2' align='center'>
              Ошибка <Button onClick={() => exploreFetcher.refetch()}>Перезагрузить</Button>
            </Flex>
          )}

          {!exploreFetcher.isError && (
            <Section size='1'>
              <Flex width='100%' justify='between'>
                <Heading.Root
                  loading={exploreFetcher.isFetching}
                  route={routes.operationalTables_kn_explorer}
                  backRoute={routes.operationalTables}
                  renderIcon={routes.operationalTables.renderIcon}
                >
                  <Heading.BackToParent />
                  <Heading.Uniq
                    string={exploreFetcher.data?.operationalTable.name}
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
                  Создать
                </Button>
              </Flex>
            </Section>
          )}

          <Section size='1'>
            <Pagination
              currentPage={page}
              limit={take}
              loading={exploreFetcher.isFetching}
              totalElements={exploreFetcher.data?.explorer.total}
              onChange={(page) => setPaginationParams({ page }, 'replace')}
            />
          </Section>

          {exploreFetcher.isSuccess && (
            <Section size='1'>
              <ScrollArea>
                <Viewer.Root
                  loading={exploreFetcher.isFetching}
                  onPathChange={(paths) => {
                    const last = paths[paths.length - 1]
                    const item = exploreFetcher.data.explorer.items.find((item) => item.name === last.name)
                    if (!item) return
                    formToUpdate.initialize(item.data)
                  }}
                  paths={exploreFetcher.data.explorer.paths}
                  data={exploreFetcher.data.explorer}
                >
                  <Viewer.Table columns={columns} />
                </Viewer.Root>
              </ScrollArea>
            </Section>
          )}
        </Container>
      </Dialog.Root>
    </main>
  )
}

Component.displayName = NAME

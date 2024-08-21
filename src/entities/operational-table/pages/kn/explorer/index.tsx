import { Dialog } from '@radix-ui/themes'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NAME_ONE } from '../../../constants/name'
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
import Section from '~/ui/section'
import { isEmpty } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = `page-${NAME_ONE.replace(/ /, '')}_id`

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 10

  const exploreFetcher = api.explorerFetchList.useCache({ kn, skip, take }, { keepPreviousData: true })

  // Update skip when page changes
  useEffect(() => {
    setSkip((page - 1) * take)
  }, [page])

  const columns = useMemo(() => {
    if (!exploreFetcher.data) return []
    const ret = toColumns(exploreFetcher.data.operationalTable.tableSchema.items)
    ret.push({
      key: 'action',
      renderHeader: () => 'Действия',
      cellProps: { width: '1rem', align: 'right' },
      renderCell: ({ item }) => (
        <Button
          round={true}
          color='red'
          onClick={(e) => {
            e.stopPropagation()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            explorerRemoveMutator.mutate({ kn: exploreFetcher.data?.operationalTable.kn, where: { id: item.data.id } })
          }}
        >
          <Icon name='Trash' />
        </Button>
      ),
    })
    return ret
  }, [exploreFetcher.data])

  const formToCreate = useCreateForm<Record<string, unknown>>(
    {
      onSubmit: (values) => {
        if (!exploreFetcher.data) return
        explorerCreateMutator.mutate({ kn: exploreFetcher.data?.operationalTable.kn, input: values })
      },
      initialValues: {},
    },
    { values: true },
  )

  const formToUpdate = useCreateForm<Record<string, unknown>>(
    {
      onSubmit: (values) => {
        if (!exploreFetcher.data) return
        explorerUpdateMutator.mutate({ kn: exploreFetcher.data?.operationalTable.kn, input: values })
      },
      initialValues: {},
    },
    { values: true },
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
    <main className={displayName}>
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
              loading={exploreFetcher.isFetching}
              limit={take.toString()}
              totalElements={exploreFetcher.data?.explorer.total?.toString()}
              onChange={setPage}
            />
          </Section>

          {exploreFetcher.isSuccess && (
            <Section size='1'>
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
            </Section>
          )}
        </Container>
      </Dialog.Root>
    </main>
  )
}

Component.displayName = displayName

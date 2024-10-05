import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { safeParse } from 'valibot'

import { routes } from '~/app/route'
import {
  Form,
  type FormValues,
  fromFormValues,
  getByKn,
  toFormValues,
  update,
  updateStoreConfigSchema,
} from '~/entities/store-config'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import { type Path, Viewer, api } from '~/shared/explorer'
import Flex from '~/shared/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import { notify } from '~/shared/notification-list-store'
import Section from '~/shared/section'
import Spinner from '~/shared/spinner'
import { HighlightedText } from '~/shared/text'
import Tooltip from '~/shared/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-storeConfigs_id'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        updateMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const storeConfig = fromFormValues(values)
        const { issues } = safeParse(updateStoreConfigSchema, storeConfig)
        return toNestedErrors(issues)
      },
      initialValues: { kn },
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      getByKn.setCache({ kn }, data.data)
      form.initialize(toFormValues(data.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const fetcher = getByKn.useCache(
    { kn },
    {
      onSuccess: (data) => form.initialize(toFormValues(data)),
    },
  )

  const [paths, setPaths] = useState<Path[]>([])

  const explorerFetcher = api.fetchList.useCache(
    {
      paths: paths.map((path) => path.name),
      type: values?.type as 'postgres',
      storeConfig: {
        host: values?.data?.host,
        port: values?.data?.port,
        username: values?.data?.username,
        password: values?.data?.password,
      },
    },
    { enabled: paths.length !== 0, keepPreviousData: true },
  )

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1'>
            <Heading>
              {routes.storeConfigs_kn.getName()}{' '}
              {values.kn && <HighlightedText tooltipContent='Название'>{values.kn}</HighlightedText>}{' '}
            </Heading>
          </Section>
        )}

        {fetcher.isLoading && (
          <Flex width='100%' justify='center'>
            <Spinner />
          </Flex>
        )}

        {fetcher.isSuccess && (
          <>
            <Section size='1'>
              <FForm
                form={form}
                // eslint-disable-next-line react-hooks/exhaustive-deps
                render={render}
              />
            </Section>

            <Section size='1'>
              <Card>
                <Flex gap='2' direction='row' justify='end'>
                  <Flex gap='2' align='center'>
                    <Tooltip content='Сбросить'>
                      <span>
                        <Button
                          size='1'
                          variant='outline'
                          onClick={() => form.reset()}
                          disabled={!form.getState().dirty}
                        >
                          Сбросить изменения
                        </Button>
                      </span>
                    </Tooltip>
                    <Button
                      loading={updateMutator.isLoading}
                      disabled={!form.getState().dirty || form.getState().invalid}
                      onClick={form.submit}
                    >
                      Сохранить
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Section>

            <Section size='1'>
              <Card>
                <Flex gap='4' direction='column'>
                  <Flex>
                    <Button
                      onClick={() => {
                        setPaths([{ type: fetcher.data.type, name: fetcher.data.data.dbName }])
                      }}
                    >
                      Просмотреть данные
                    </Button>
                  </Flex>
                  {paths.length !== 0 && (
                    <Viewer.Root
                      error={explorerFetcher.error?.response?.data}
                      onPathChange={setPaths}
                      loading={explorerFetcher.isFetching}
                      paths={paths}
                      explorer={explorerFetcher.data}
                    >
                      <Viewer.Breadscrums />
                      <Viewer.List />
                    </Viewer.Root>
                  )}
                </Flex>
              </Card>
            </Section>
          </>
        )}
      </Container>
    </main>
  )
}

Component.displayName = displayName

import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { Form, type FormValues, api, fromFormValues, toFormValues } from '~/entities/target-table'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import { notify } from '~/shared/notification-list-store'
import { routes } from '~/shared/routes'
import Section from '~/shared/section'
import Spinner from '~/shared/spinner'
import TextHighlighter from '~/shared/text-highlighter'
import Tooltip from '~/shared/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-targetTables_id'

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
      // TODO: валидация
      // validate: (values) => {
      //   const targetTable = fromFormValues(values)
      //   const { issues } = safeParse(updateTargetTableSchema, targetTable)
      //   return toNestedErrors(issues)
      // },
      initialValues: { kn },
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const updateMutator = api.update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      api.getByKn.setCache({ kn }, data.data)
      form.initialize(toFormValues(data.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const fetcher = api.getByKn.useCache(
    { kn },
    {
      onSuccess: (data) => form.initialize(toFormValues(data)),
    },
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
              {routes.targetTables_kn.getName()}{' '}
              {values.name && <TextHighlighter tooltipContent='Название'>{values.name}</TextHighlighter>}{' '}
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
              <FForm form={form} render={render} />
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
                      // loading={updateMutator.isLoading}
                      disabled={!form.getState().dirty || form.getState().invalid}
                      onClick={form.submit}
                    >
                      Сохранить
                    </Button>
                  </Flex>
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

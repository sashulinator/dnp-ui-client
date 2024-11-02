import { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { safeParse } from 'valibot'

import { routes } from '~/app/route'
import {
  Form,
  type FormValues,
  Version,
  fromFormValues,
  getById,
  normalizationConfigSchema,
  toFormValues,
  update,
} from '~/entities/normalization-config'
import { auth } from '~/shared/auth'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import { notify } from '~/shared/notification-list-store'
import Section from '~/shared/section'
import Spinner from '~/shared/spinner'
import { HighlightedText } from '~/shared/text'
import Tooltip from '~/shared/tooltip'

import * as run from '../../api/run'

export interface Props {
  className?: string | undefined
}

const NAME = 'page-NormalizationConfigs_id'

export default function Component(): JSX.Element {
  const { id = '' } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams({ name: '' })
  const name = searchParams.get('name') || ''
  const navigate = useNavigate()

  const hasPermissionToEdit = auth.hasRole(auth.roles.nrm_upd, 'dnp')

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        updateMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const normalizationConfig = fromFormValues(values)
        const { issues } = safeParse(normalizationConfigSchema, normalizationConfig)
        return toNestedErrors(issues)
      },
      initialValues: { name },
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values
  const isCurrent = form.getState().values.last

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      getById.setCache({ id }, data.data)
      if (data.data.v !== form.getState().values.v) {
        navigate(routes.normalizationConfigs_id.getUrl(data.data.id))
      } else {
        form.initialize(toFormValues(data.data))
      }
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const runMutator = run.useMutation({
    onSuccess: () => {
      notify({ title: 'Запущено', type: 'success' })
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const fetcher = getById.useCache(
    { id },
    {
      onSuccess: (data) => form.initialize(toFormValues(data)),
    },
  )

  const render = useCallback(
    () => <Form readonly={!isCurrent || !hasPermissionToEdit} />,
    [isCurrent, hasPermissionToEdit],
  )

  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1'>
            <Heading>
              {routes.normalizationConfigs_id.getName()}{' '}
              {values.name && <HighlightedText tooltipContent='Название'>{values.name}</HighlightedText>}{' '}
              {values.v && (
                <HighlightedText color='yellow' tooltipContent='Версия'>
                  {values.v}
                </HighlightedText>
              )}
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
              <Card>
                <Version
                  item={fetcher.data}
                  isProcessCreating={runMutator.isLoading}
                  onCreateProcessButtonClick={() => runMutator.mutate({ id: fetcher.data.id })}
                />
              </Card>
            </Section>

            <Section size='1'>
              <FForm
                form={form}
                // eslint-disable-next-line react-hooks/exhaustive-deps
                render={render}
              />
            </Section>

            <Card asChild>
              <Section size='1'>
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
              </Section>
            </Card>
          </>
        )}
      </Container>
    </main>
  )
}

Component.displayName = NAME

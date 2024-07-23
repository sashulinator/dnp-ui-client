import { SymbolIcon, TrashIcon } from '@radix-ui/react-icons'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { safeParse } from 'valibot'
import {
  Form,
  FormValues,
  fromFormValues,
  getById,
  normalizationConfigSchema,
  remove,
  toFormValues,
  update,
} from '~/entities/normalization-config'
import { create as createProcess } from '~/entities/process'
import { notify } from '~/shared/notification-list-store'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/ui/form'
import Heading from '~/ui/heading'
import Section from '~/ui/section'
import Spinner from '~/ui/spinner'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-NormalizationConfigs_name'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

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
      initialValues: { name: id },
    },
    { values: true },
  )

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      getById.setCache({ id }, data.data)
      form.initialize(toFormValues(data.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const removeMutator = remove.useCache({
    onSuccess: () => {
      navigate(routes.normalizationConfigs.getURL())
      notify({ title: 'Сохранено', type: 'success' })
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const createProcessMutator = createProcess.useCache({
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

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        {fetcher.isLoading && (
          <Flex width='100%' justify='center'>
            <Spinner />
          </Flex>
        )}
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}
        {fetcher.isSuccess && (
          <>
            <Section size='1'>
              <Heading>{routes.normalizationConfigs.getName()}</Heading>
            </Section>

            <Flex width='100%' justify='end'>
              <Flex align='center' gap='4'>
                Версия: {fetcher.data?.v}
                <Button
                  loading={createProcessMutator.isLoading}
                  onClick={() => createProcessMutator.mutate({ normalizationConfigId: fetcher.data.id })}
                >
                  Запустить
                </Button>
              </Flex>
            </Flex>

            <Section size='1'>
              <FForm
                form={form}
                // eslint-disable-next-line react-hooks/exhaustive-deps
                render={render}
              />
            </Section>
            <Flex gap='2' justify='between'>
              <Button color='red' round={true} onClick={() => removeMutator.mutate({ id: fetcher.data.id })}>
                <TrashIcon />
              </Button>
              <Flex gap='2' align='center'>
                <Button
                  size='1'
                  variant='outline'
                  onClick={() => form.reset()}
                  disabled={!form.getState().dirty}
                  round={true}
                >
                  <SymbolIcon />
                </Button>
                <Button
                  loading={updateMutator.isLoading}
                  disabled={!form.getState().dirty || form.getState().invalid}
                  onClick={form.submit}
                >
                  Сохранить
                </Button>
              </Flex>
            </Flex>
          </>
        )}
      </Container>
    </main>
  )
}

Component.displayName = displayName

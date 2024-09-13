import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { safeParse } from 'valibot'

import {
  Form,
  FormValues,
  create,
  createStoreConfigSchema,
  defaultValues,
  fromFormValues,
  getByKn,
  toFormValues,
} from '~/entities/store-config'
import { notify } from '~/old-shared/notification-list-store'
import { routes } from '~/old-shared/routes'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import Section from '~/shared/section'
import TextHighlighter from '~/shared/text-highlighter'
import Tooltip from '~/shared/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-storeConfigs_id'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const navigate = useNavigate()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        createMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const createStoreConfig = fromFormValues(values)
        const { issues } = safeParse(createStoreConfigSchema, createStoreConfig)
        return toNestedErrors(issues)
      },
      initialValues: toFormValues(defaultValues),
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const createMutator = create.useCache({
    onSuccess: (data) => {
      notify({ title: 'Создано', type: 'success' })
      getByKn.setCache({ kn: data.data.kn }, data.data)
      navigate(routes.storeConfigs_kn.getURL(data.data.kn))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>
            {routes.storeConfigs_create.getName()}{' '}
            {values.kn && <TextHighlighter tooltipContent='Название'>{values.kn}</TextHighlighter>}{' '}
          </Heading>
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
                    <Button size='1' variant='outline' onClick={() => form.reset()} disabled={!form.getState().dirty}>
                      Сбросить изменения
                    </Button>
                  </span>
                </Tooltip>
                <Button
                  loading={createMutator.isLoading}
                  disabled={!form.getState().dirty || form.getState().invalid}
                  onClick={form.submit}
                >
                  Создать
                </Button>
              </Flex>
            </Flex>
          </Section>
        </Card>
      </Container>
    </main>
  )
}

Component.displayName = displayName

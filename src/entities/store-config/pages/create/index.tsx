import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { safeParse } from 'valibot'

import { routes } from '~dnp/app/route'
import {
  Form,
  type FormValues,
  create,
  createStoreConfigSchema,
  defaultValues,
  fromFormValues,
  getByKn,
  toFormValues,
} from '~dnp/entities/store-config'
import Button from '~dnp/shared/button'
import Card from '~dnp/shared/card'
import Container from '~dnp/shared/container'
import Flex from '~dnp/shared/flex'
import FForm, { toNestedErrors, useCreateForm } from '~dnp/shared/form'
import Heading from '~dnp/shared/heading'
import { notify } from '~dnp/shared/notification-list-store'
import Section from '~dnp/shared/section'
import { HighlightedText } from '~dnp/shared/text'
import Tooltip from '~dnp/shared/tooltip'

export interface Props {
  className?: string | undefined
}

const NAME = 'page-storeConfigs_id'

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
      navigate(routes.storeConfigs_kn.getUrl(data.data.kn))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const render = useCallback(() => <Form />, [])

  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading>
            {routes.storeConfigs_create.getName()}{' '}
            {values.kn && <HighlightedText tooltipContent='Название'>{values.kn}</HighlightedText>}{' '}
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

Component.displayName = NAME

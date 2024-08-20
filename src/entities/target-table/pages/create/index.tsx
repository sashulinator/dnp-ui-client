import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, FormValues, api, defaultValues, fromFormValues, toFormValues } from '~/entities/target-table'
import { notify } from '~/shared/notification-list-store'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { useCreateForm } from '~/ui/form'
import Heading from '~/ui/heading'
import Section from '~/ui/section'
import TextHighlighter from '~/ui/text-highlighter'
import Tooltip from '~/ui/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-targetTables_create'

/**
 * page-targetTables_id
 */
export default function Component(): JSX.Element {
  const navigate = useNavigate()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        createMutator.mutate({ input: fromFormValues(values) })
      },
      // validate: (values) => {
      //   const createStoreConfig = fromFormValues(values)
      //   const { issues } = safeParse(createStoreConfigSchema, createStoreConfig)
      //   return toNestedErrors(issues)
      // },
      initialValues: toFormValues(defaultValues),
    },
    { values: true },
  )

  const values = form.getState().values

  const createMutator = api.create.useCache({
    onSuccess: (data) => {
      notify({ title: 'Создано', type: 'success' })
      api.getByKn.setCache({ kn: data.data.kn }, data.data)
      navigate(routes.targetTables_kn.getURL(data.data.kn))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>
            {routes.targetTables_create.getName()}{' '}
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

import { useNavigate } from 'react-router-dom'
import { safeParse } from 'valibot'

import { routes } from '~/app/route'
import {
  type FormValues,
  create,
  createNormalizationConfigSchema,
  defaultValues,
  fromFormValues,
  getById,
  toFormValues,
} from '~/entities/normalization-config'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import { toNestedErrors, useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import { notify } from '~/shared/notification-list-store'
import Section from '~/shared/section'
import { HighlightedText } from '~/shared/text'
import Tooltip from '~/shared/tooltip'

import DemoForm from './demo-form'

export interface Props {
  className?: string | undefined
}

const NAME = 'page-NormalizationConfigs_create'

export default function Component(): JSX.Element {
  const navigate = useNavigate()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        createMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const createNormalizationConfig = fromFormValues(values)
        const { issues } = safeParse(createNormalizationConfigSchema, createNormalizationConfig)
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
      getById.setCache({ id: data.data.id }, data.data)
      navigate(routes.normalizationConfigs_id.getUrl(data.data.id))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading>
            {routes.normalizationConfigs_create.getName()}{' '}
            {values.name && <HighlightedText tooltipContent='Название'>{values.name}</HighlightedText>}
          </Heading>
        </Section>

        <Section size='1'>
          <DemoForm />
          {/* <FForm
            form={form}
            // eslint-disable-next-line react-hooks/exhaustive-deps
            render={render}
          /> */}
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

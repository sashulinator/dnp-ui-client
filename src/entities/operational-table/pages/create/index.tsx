import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { safeParse } from 'valibot'
import { NAME_ONE } from '../../constants/name'
import {
  Form,
  FormValues,
  api,
  createOperationalTableSchema,
  defaultValues,
  fromFormValues,
  toFormValues,
} from '~/entities/operational-table'
import { notify } from '~/shared/notification-list-store'
import { queryClient } from '~/shared/react-query'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/ui/form'
import Heading from '~/ui/layout/variants/heading'
import Section from '~/ui/section'
import Separator from '~/ui/separator'
import Tooltip from '~/ui/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = `page-${NAME_ONE.replace(/ /, '')}_create`

/**
 * page-operationalTables_id
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
        const { issues } = safeParse(createOperationalTableSchema, createStoreConfig)
        return toNestedErrors(issues)
      },
      initialValues: toFormValues(defaultValues),
    },
    { values: true },
  )

  const values = form.getState().values

  const createMutator = api.create.useCache({
    onSuccess: (data) => {
      notify({ title: 'Создано', type: 'success' })
      api.getByKn.setCache({ kn: data.data.kn }, data.data)
      navigate(routes.operationalTables_kn.getURL(data.data.kn))
      // 👷 TODO убрать когда навигация будет настраиваться отдельно
      queryClient.invalidateQueries('oper')
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading.Root
            loading={false}
            route={routes.operationalTables_create}
            backRoute={routes.operationalTables}
            renderIcon={routes.operationalTables.renderIcon}
          >
            <Heading.BackToParent />
            <Heading.Name />
            <Heading.Uniq string={values.name} tooltipContent='Название' />
          </Heading.Root>
        </Section>

        <Section size='1'>
          <FForm
            form={form}
            // eslint-disable-next-line react-hooks/exhaustive-deps
            render={render}
          />
        </Section>

        <Section size='1'>
          <Flex justify='end'>
            <Card>
              <Flex gap='2' direction='row' justify='end'>
                <Flex gap='2' align='center'>
                  <Tooltip content='Сбросить'>
                    <span>
                      <Button size='1' variant='outline' onClick={() => form.reset()} disabled={!form.getState().dirty}>
                        Сбросить изменения
                      </Button>
                    </span>
                  </Tooltip>
                  <Separator orientation='vertical' />
                  <Button
                    loading={createMutator.isLoading}
                    disabled={!form.getState().dirty || form.getState().invalid}
                    onClick={form.submit}
                  >
                    Создать
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName

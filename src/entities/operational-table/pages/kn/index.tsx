import { useParams } from 'react-router-dom'
import { safeParse } from 'valibot'

import {
  Form,
  type FormValues,
  api,
  fromFormValues,
  toFormValues,
  updateOperationalTableSchema,
} from '~/entities/operational-table'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import UiForm, { toNestedErrors, useCreateForm } from '~/shared/form'
import Heading from '~/shared/layout/variants/heading'
import { notify } from '~/shared/notification-list-store'
import { queryClient } from '~/shared/react-query'
import { routeMap } from '~/shared/route'
import Section from '~/shared/section'
import Separator from '~/shared/separator'
import Tooltip from '~/shared/tooltip'

import { SYSNAME } from '../../constants/name'

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id`

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const fetcher = api.getByKn.useCache(
    { kn },
    {
      onSuccess: (data) => {
        form.initialize(toFormValues(data))
      },
    },
  )

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        updateMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const operationalTable = fromFormValues(values)
        const { issues } = safeParse(updateOperationalTableSchema, operationalTable)
        return toNestedErrors(issues)
      },
      initialValues: fetcher.data || { kn },
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const updateMutator = api.update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      api.getByKn.setCache({ kn }, data.data)
      form.initialize(toFormValues(data.data))
      // 👷 TODO убрать когда навигация будет настраиваться отдельно
      queryClient.invalidateQueries('oper')
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

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
            <Heading.Root
              loading={fetcher.isFetching}
              route={routeMap.operationalTables_kn}
              backRoute={routeMap.operationalTables}
              renderIcon={routeMap.operationalTables.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Name />
              <Heading.Uniq string={values.name} tooltipContent='Название' />
            </Heading.Root>
          </Section>
        )}

        {fetcher.isSuccess && (
          <>
            <Section size='1'>
              <UiForm form={form} component={Form} />
            </Section>

            <Section size='1'>
              <Flex justify='end'>
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
                      <Separator orientation='vertical' />
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
              </Flex>
            </Section>
          </>
        )}
      </Container>
    </main>
  )
}

Component.displayName = NAME

import { useParams } from 'react-router-dom'
import { safeParse } from 'valibot'

import { routes } from '~dnp/app/route'
import {
  Form,
  type FormValues,
  api,
  fromFormValues,
  toFormValues,
  updateTargetTableSchema,
} from '~dnp/entities/target-table'
import TargetTable_kn_explorer from '~dnp/entities/target-table/pages/explorer'
import Button from '~dnp/shared/button'
import Card from '~dnp/shared/card'
import Container from '~dnp/shared/container'
import Flex from '~dnp/shared/flex'
import UiForm, { toNestedErrors, useCreateForm } from '~dnp/shared/form'
import { notify } from '~dnp/shared/notification-list-store'
import { Heading } from '~dnp/shared/page'
import { queryClient } from '~dnp/shared/react-query'
import Section from '~dnp/shared/section'
import Separator from '~dnp/shared/separator'
import Tooltip from '~dnp/shared/tooltip'

import { SYSNAME } from '../../constants/name'

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id`

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

  // console.log(fetcher, 'API KN')

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        updateMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const targetTable = fromFormValues(values)
        const { issues } = safeParse(updateTargetTableSchema, targetTable)
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
              route={routes.targetTables_kn}
              backRoute={routes.targetTables}
              renderIcon={routes.targetTables.payload.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Name />
              <Heading.Unique string={values.name} tooltipContent='Название' />
            </Heading.Root>
          </Section>
        )}

        {fetcher.isSuccess && (
          <>
            <Section size='1'>
              <UiForm form={form} component={Form} />
            </Section>
            <Section>
              <TargetTable_kn_explorer />
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

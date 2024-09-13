import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { safeParse } from 'valibot'

import {
  Form,
  FormValues,
  api,
  createDictionaryTableSchema,
  defaultValues,
  fromFormValues,
  toFormValues,
} from '~/entities/dictionary-table'
import { notify } from '~/old-shared/notification-list-store'
import { queryClient } from '~/old-shared/react-query'
import { routes } from '~/old-shared/routes'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/shared/form'
import Heading from '~/shared/layout/variants/heading'
import Section from '~/shared/section'
import Separator from '~/shared/separator'
import Tooltip from '~/shared/tooltip'

import { SYSNAME } from '../../constants/name'

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_create`

/**
 * page-dictionaryTables_id
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
        const { issues } = safeParse(createDictionaryTableSchema, createStoreConfig)
        return toNestedErrors(issues)
      },
      initialValues: toFormValues(defaultValues),
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const createMutator = api.create.useCache({
    onSuccess: (data) => {
      notify({ title: 'Создано', type: 'success' })
      api.getByKn.setCache({ kn: data.data.kn }, data.data)
      navigate(routes.dictionaryTables_kn.getURL(data.data.kn))
      // 👷 TODO убрать когда навигация будет настраиваться отдельно
      queryClient.invalidateQueries('oper')
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const render = useCallback(
    () => (
      <Form
        isKnUniq={(kn) =>
          api.getByKn
            .request({ kn })
            .then(() => false)
            .catch((res) => {
              if (res.response.status === 404) return true
              throw res
            })
        }
      />
    ),
    [],
  )

  return (
    <main className={NAME}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading.Root
            loading={false}
            route={routes.dictionaryTables_create}
            backRoute={routes.dictionaryTables}
            renderIcon={routes.dictionaryTables.renderIcon}
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

Component.displayName = NAME

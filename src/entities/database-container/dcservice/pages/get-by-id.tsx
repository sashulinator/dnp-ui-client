import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { APP } from '~/app/constants.app'
import { routes } from '~/app/route'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Heading, Main } from '~/shared/page'
import Section from '~/shared/section'
import { assertDefined, c } from '~/utils/core'

import { dcserviceApi } from '..'
import { SLICE } from '../constants.slice'
import DcserviceForm, { type Values } from '../ui/form'
import TestConnection from '../ui/test-connection'

const NAME = `${APP}-page-${SLICE}-GetById`

export default function Component(): JSX.Element {
  const { id = '' } = useParams()

  const fetcher = dcserviceApi.getById.useCache(
    { id },
    {
      onSuccess(dcservice) {
        form.initialize(DcserviceForm.toValues(dcservice))
      },
    },
  )

  const updateMutator = dcserviceApi.update.useMutation({
    onSuccess: (response) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(DcserviceForm.toValues(response.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<Values>(
    {
      initialValues: fetcher.data ? DcserviceForm.toValues(fetcher.data) : {},
      onSubmit: (values) => {
        assertDefined(fetcher.data)
        const input = { ...fetcher.data, ...DcserviceForm.toDcservice(values) }
        updateMutator.mutate({ input })
      },
    },
    {
      values: true,
    },
  )

  const formState = form.getState()
  const isAnimated = useMemo(() => !fetcher.data, [])

  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <Container p='var(--space-4)'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1' className={c(isAnimated && cssAnimations.Appear)}>
            <Flex align='center' justify='between' gap='2'>
              <Heading.Root route={routes.dcservice_getById} backRoute={routes.dcservice_findWithTotal}>
                <Heading.BackToParent />
                <Heading.Name />
                <Heading.Unique string={formState.values.display} tooltipContent='Отображение' />
              </Heading.Root>
            </Flex>
          </Section>
        )}

        <Flex direction='column' width='780px'>
          <Section
            size='1'
            className={c(isAnimated && cssAnimations.Appear)}
            style={{ animationDelay: `${TICK_MS * 2}ms` }}
          >
            <Form form={form} disabled={fetcher.isLoading} component={DcserviceForm} />
          </Section>

          <Section
            size='1'
            className={c(isAnimated && cssAnimations.Appear)}
            style={{ animationDelay: `${TICK_MS * 3}ms` }}
          >
            <Flex justify='start'>
              <Flex gap='2' direction='row' justify='end'>
                <Flex gap='2' direction='column'>
                  <TestConnection
                    disabled={form.getState().invalid}
                    request={() =>
                      dcserviceApi.testConnection
                        .request({
                          client: 'pg',
                          host: formState.values.host,
                          port: formState.values.port,
                          user: formState.values.username,
                          password: formState.values.password,
                        })
                        .then((ret) => ret.data)
                    }
                  />
                  <Flex>
                    <Button
                      // loading={updateMutator.isLoading}
                      disabled={!form.getState().dirty || form.getState().invalid}
                      onClick={form.submit}
                    >
                      Сохранить
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Section>
        </Flex>
      </Container>
    </Main>
  )
}

Component.displayName = NAME

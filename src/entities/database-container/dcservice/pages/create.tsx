import { useNavigate } from 'react-router-dom'

import { APP } from '~/app/constants.app'
import { routes } from '~/app/route'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Heading, Main } from '~/shared/page'
import Section from '~/shared/section'
import Separator from '~/shared/separator'
import { c } from '~/utils/core'

import { dcserviceApi } from '..'
import { SLICE } from '../constants.slice'
import DcserviceForm, { type Values } from '../ui/form'
import TestConnection from '../ui/test-connection'

const NAME = `${APP}-page-${SLICE}-GetById`

export default function Component(): JSX.Element {
  const navigate = useNavigate()

  const createMutator = dcserviceApi.create.useMutation({
    onSuccess: (response) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(DcserviceForm.toValues(response.data))
      dcserviceApi.getById.setCache({ id: response.data.id }, response.data)
      navigate(routes.dcservice_getById.getUrl(response.data.id))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<Values>(
    {
      onSubmit: (values) => {
        createMutator.mutate({ input: DcserviceForm.toDcservice(values) })
      },
    },
    {
      values: true,
    },
  )

  const formState = form.getState()

  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <Container p='var(--space-4)'>
        <Section size='1' className={c(cssAnimations.Appear)}>
          <Flex align='center' justify='between' gap='2'>
            <Heading.Root route={routes.dcservice_getById} backRoute={routes.dcservice_findWithTotal}>
              <Heading.BackToParent />
              <Heading.Name />
              <Heading.Unique string={formState.values.display} tooltipContent='Отображение' />
            </Heading.Root>
          </Flex>
        </Section>

        <Flex direction='column' width='780px'>
          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 2}ms` }}>
            <Form form={form} component={DcserviceForm} />
          </Section>

          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
            <Flex justify='start'>
              <Card>
                <Flex gap='2' direction='row' justify='end'>
                  <Flex gap='2' align='center'>
                    <TestConnection
                      disabled={!form.getState().dirty || form.getState().invalid}
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
                    <Button
                      // loading={updateMutator.isLoading}
                      disabled={!form.getState().dirty || form.getState().invalid}
                      onClick={form.submit}
                    >
                      Создать
                    </Button>
                    <Separator orientation='vertical' />
                    <Button size='1' variant='ghost' onClick={() => form.reset()} disabled={!form.getState().dirty}>
                      Сбросить изменения
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </Section>
        </Flex>
      </Container>
    </Main>
  )
}

Component.displayName = NAME

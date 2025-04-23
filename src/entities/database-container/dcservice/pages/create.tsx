import { useNavigate } from 'react-router-dom'

import { routes } from '~/app/route'
import { Dcservice } from '~/entities/database-container'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Heading, Main } from '~/shared/page'
import Section from '~/shared/section'
import { c } from '~/utils/core'

const NAME = `page-GetServiceById`

export default function Component(): JSX.Element {
  const navigate = useNavigate()

  const createMutator = Dcservice.api.create.useMutation({
    onSuccess: (response) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(Dcservice.Form.default.toValues(response.data))
      Dcservice.api.getById.setCache({ id: response.data.id }, response.data)
      navigate(routes.dcservice_getById.getUrl(response.data.id))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<Dcservice.Form.Values>(
    {
      onSubmit: (values) => {
        createMutator.mutate({ input: Dcservice.Form.default.toDcservice(values) })
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
            <Form form={form} component={Dcservice.Form.default} />
          </Section>

          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
            <Flex justify='start'>
              <Flex gap='2' direction='row' justify='end'>
                <Flex gap='2' direction='column'>
                  <Dcservice.TestConnection.default
                    disabled={form.getState().invalid}
                    request={() =>
                      Dcservice.api.testConnection
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

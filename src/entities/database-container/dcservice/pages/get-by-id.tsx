import { useParams } from 'react-router-dom'

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
import { assertDefined, c } from '~/utils/core'

import { dcserviceApi } from '..'
import { SLICE } from '../constants.slice'
import DcserviceForm, { type Values } from '../ui/form'

export interface Props {
  className?: string | undefined
}

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

  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <Container p='var(--space-4)'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1' className={c(cssAnimations.Appear)}>
            <Flex align='center' justify='between' gap='2'>
              <Heading.Root route={routes.dcservice_getById} backRoute={routes.dcservice_findWithTotal}>
                <Heading.BackToParent />
                <Heading.Name />
                <Heading.Unique string={formState.values.display} tooltipContent='Отображение' />
              </Heading.Root>
            </Flex>
          </Section>
        )}

        {fetcher.isSuccess && (
          <Flex direction='column' width='780px'>
            <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 2}ms` }}>
              <Form form={form} disabled={fetcher.isLoading} component={DcserviceForm} />
            </Section>

            <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
              <Flex justify='start'>
                <Card>
                  <Flex gap='2' direction='row' justify='end'>
                    <Flex gap='2' align='center'>
                      <Button
                        // loading={updateMutator.isLoading}
                        disabled={!form.getState().dirty || form.getState().invalid}
                        onClick={form.submit}
                      >
                        Сохранить
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
        )}
      </Container>
    </Main>
  )
}

Component.displayName = NAME

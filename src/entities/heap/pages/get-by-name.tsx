import { Container, DataList, Flex, Section, Separator, Tooltip } from '@radix-ui/themes'

import { useParams } from 'react-router-dom'

import { get, update } from '~/entities/heap'
import Button from '~/shared/button'
import Card from '~/shared/card'
import { useCreateForm } from '~/shared/form'
import UiForm from '~/shared/form'
import { notify } from '~/shared/notification-list-store'

import Form, { type Values } from '../ui/form'

const NAME = 'heap-Page'

export default function Page(): JSX.Element {
  const { name = '' } = useParams()

  const fetcher = get.useCache(
    { name },
    {
      onSuccess: (data) => {
        form.initialize(Form.toFormValues(data))
      },
    },
  )

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(Form.toFormValues(data.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<Values>(
    {
      initialValues: Form.toFormValues({
        data: [],
        name: '',
        description: '',
      }),
      onSubmit: async (values) => {
        updateMutator.mutate(Form.fromFormValues(values))
      },
    },
    { values: true, initialValues: true },
  )

  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <DataList.Root>
            <DataList.Item align='center'>
              <DataList.Label>Название</DataList.Label>
              <DataList.Value>{fetcher.data?.name}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Section>
        <Section size='1'>
          <DataList.Root>
            <DataList.Item align='center'>
              <DataList.Label>Описание</DataList.Label>
              <DataList.Value>{fetcher.data?.description}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Section>
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
                      <Button size='1' variant='outline' onClick={() => form.reset()} disabled={!form.getState().dirty}>
                        Сбросить изменения
                      </Button>
                    </span>
                  </Tooltip>
                  <Separator orientation='vertical' />
                  <Button disabled={!form.getState().dirty} onClick={form.submit}>
                    Сохранить
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

Page.displayName = NAME

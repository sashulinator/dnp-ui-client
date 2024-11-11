import { Container, DataList, Flex, Section, Separator, Tooltip } from '@radix-ui/themes'

import { useCallback, useEffect } from 'react'

import { get, update } from '~/entities/heap'
import Button from '~/shared/button'
import Card from '~/shared/card'
import { useCreateForm } from '~/shared/form'
import UiForm from '~/shared/form'
import { notify } from '~/shared/notification-list-store'

import type { Heap } from '../types/heap-types'
import Form from '../ui/form'

const NAME = 'heap-Page'

const heapName = 'navMenu'

export default function Page(): JSX.Element {
  const fetcher = get.useCache({ name: heapName })

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(data.data)
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm({
    initialValues: fetcher.data ?? {
      data: [],
      name: '',
      description: '',
    },

    onSubmit: async (values: Heap) => {
      updateMutator.mutate(values)
    },
  })

  useEffect(() => {
    if (fetcher.data) {
      form.initialize({
        data: fetcher.data.data ?? {},
        name: fetcher.data.name ?? '',
        description: fetcher.data.description ?? '',
      })
    }
  }, [fetcher.data, form])

  const render = useCallback(() => <Form />, [])

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
          {' '}
          <UiForm form={form} component={render} />
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
                  <Button onClick={form.submit}>Создать</Button>
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

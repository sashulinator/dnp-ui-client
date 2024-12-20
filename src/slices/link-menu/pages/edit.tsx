import { Container, Flex, Section, Separator, Tooltip } from '@radix-ui/themes'

import Button from '~/shared/button'
import Card from '~/shared/card'
import { useCreateForm } from '~/shared/form'
import Form from '~/shared/form'
import { notify } from '~/shared/notification-list-store'
import { Form as LinkMenuForm } from '~/slices/link-menu'
import { type TreeItem } from '~/slices/link-menu'
import { api } from '~/slices/store'

const NAME = 'store-Page'

export default function Page(): JSX.Element {
  const fetcher = api.getByName.useCache(
    { name: 'navMenu' },
    {
      onSuccess: (data) => {
        form.initialize(LinkMenuForm.default.toFormValues(data.data as TreeItem[]))
      },
    },
  )

  const updateMutator = api.update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      form.initialize(LinkMenuForm.default.toFormValues(data.data.data as TreeItem[]))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const form = useCreateForm<{ root: { children: LinkMenuForm.Values[] } }>(
    {
      onSubmit: async (values) => {
        updateMutator.mutate({
          input: {
            name: fetcher.data!.name,
            description: fetcher.data!.description,
            data: LinkMenuForm.default.toLinkMenu(values),
          },
        })
      },
    },
    { values: true, initialValues: true },
  )

  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Form name='root' form={form} component={LinkMenuForm.default} />
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

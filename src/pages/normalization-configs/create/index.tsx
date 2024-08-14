import { SymbolIcon } from '@radix-ui/react-icons'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { safeParse } from 'valibot'
import {
  Form,
  FormValues,
  fromFormValues,
  getById,
  toFormValues,
  create,
  defaultValues,
  createNormalizationConfigSchema,
} from '~/entities/normalization-config'
import { notify } from '~/shared/notification-list-store'
import { getUserRole } from '~/shared/roles/lib/get-user-role'
import { UserRole } from '~/shared/roles/types'
import { AccessGuard } from '~/shared/roles/widgets/access-guard'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/ui/form'
import Heading from '~/ui/heading'
import Section from '~/ui/section'
import TextHighlighter from '~/ui/text-highlighter'
import Tooltip from '~/ui/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-NormalizationConfigs_create'

/**
 * page-Main
 */
function Page(): JSX.Element {
  const navigate = useNavigate()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        createMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const createNormalizationConfig = fromFormValues(values)
        const { issues } = safeParse(createNormalizationConfigSchema, createNormalizationConfig)
        return toNestedErrors(issues)
      },
      initialValues: toFormValues(defaultValues),
    },
    { values: true },
  )

  const values = form.getState().values
  const isCurrent = form.getState().values.last

  const createMutator = create.useCache({
    onSuccess: (data) => {
      notify({ title: 'Создано', type: 'success' })
      getById.setCache({ id: data.data.id }, data.data)
      navigate(routes.normalizationConfigs_id.getURL(data.data.id))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const render = useCallback(() => <Form readonly={!isCurrent} />, [isCurrent])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>
            {routes.normalizationConfigs_create.getName()}{' '}
            {values.name && <TextHighlighter tooltipContent='Название'>{values.name}</TextHighlighter>}
          </Heading>
        </Section>

        <Section size='1'>
          <FForm
            form={form}
            // eslint-disable-next-line react-hooks/exhaustive-deps
            render={render}
          />
        </Section>

        <Card asChild>
          <Section size='1'>
            <Flex gap='2' direction='row' justify='end'>
              <Flex gap='2' align='center'>
                <Tooltip content='Сбросить'>
                  <span>
                    <Button
                      size='1'
                      variant='outline'
                      onClick={() => form.reset()}
                      disabled={!form.getState().dirty}
                      round={true}
                    >
                      <SymbolIcon />
                    </Button>
                  </span>
                </Tooltip>
                <Button
                  loading={createMutator.isLoading}
                  disabled={!form.getState().dirty || form.getState().invalid}
                  onClick={form.submit}
                >
                  Создать
                </Button>
              </Flex>
            </Flex>
          </Section>
        </Card>
      </Container>
    </main>
  )
}

Page.displayName = displayName

export default function Component() {
  const role = getUserRole()

  return (
    <AccessGuard allowedRoles={[UserRole.Admin]} currentRole={role} roleIsChecking={false}>
      <Page />
    </AccessGuard>
  )
}

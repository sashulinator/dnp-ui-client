import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { safeParse } from 'valibot'
import {
  Form,
  FormValues,
  fromFormValues,
  getByName,
  normalizationConfigSchema,
  toFormValues,
} from '~/entities/normalization-config'
import { routes } from '~/shared/routes'
import Container from '~/ui/container'
import FForm, { toNestedErrors, useCreateForm } from '~/ui/form'
import Heading from '~/ui/heading'
import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-NormalizationConfigs_name'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { name = '' } = useParams<{ name: string }>()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (data) => {
        console.log('data', data)

        // return void updateMutator.mutateAsync({ input: data })
      },
      validate: (values) => {
        const normalizationConfig = fromFormValues(values)
        const { issues } = safeParse(normalizationConfigSchema, normalizationConfig)
        return toNestedErrors(issues)
      },
      initialValues: { name },
    },
    { values: true },
  )

  getByName.useCache(
    { name },
    {
      onSuccess: (data) => form.initialize(toFormValues(data)),
    },
  )

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>{routes.normalizationConfigs.getName()}</Heading>
        </Section>
        <Section size='1'>
          <FForm
            form={form}
            // eslint-disable-next-line react-hooks/exhaustive-deps
            render={render}
          />
        </Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName

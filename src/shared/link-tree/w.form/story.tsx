/* eslint-disable no-console */
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import LinkMenuForm from '.'

interface State {}

export default {
  getName: (): string => LinkMenuForm.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm(
      {
        onSubmit: console.log,
        initialValues: {
          name: {
            children: [{}],
          },
        },
      },
      {
        values: true,
      },
    )

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Form form={form}>{() => <LinkMenuForm name='name' {...state} />}</Form>
        <code>{JSON.stringify(form.getState()?.values, null, 2)}</code>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>

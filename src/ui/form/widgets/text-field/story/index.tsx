import { type Story, Props } from '~/ui/storybook'

import TextField from '../'
import Flex from '~/ui/flex'
import Form, { Field, useCreateForm } from '~/ui/form'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm({ onSubmit: console.log }, { values: true, initialValues: true })

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Form form={form}>{() => <Field component={TextField} label='test' name='test' {...state} />}</Form>
        <code>{JSON.stringify(form.getState()?.values, null, 2)}</code>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>

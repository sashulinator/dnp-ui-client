import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { Props, type Story } from '~/shared/storybook'

import KeyValue from '..'

interface State {}

export default {
  getName: (): string => KeyValue.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm({ onSubmit: console.log }, { values: true, initialValues: true })

    return (
      <Flex width='100%' p='8' gap='4'>
        <Form form={form}>{() => <KeyValue label='test' name='test' {...state} />}</Form>
        <code style={{ whiteSpace: 'pre-wrap', width: '100%' }}>
          {JSON.stringify(form.getState()?.values, null, 2)}
        </code>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>

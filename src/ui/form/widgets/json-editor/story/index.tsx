import { type Story, Props } from '~/ui/storybook'

import JsonEditor from '../'
import Flex from '~/ui/flex'
import Form, { useCreateForm } from '~/ui/form'

interface State {}

export default {
  getName: (): string => JsonEditor.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm(
      {
        onSubmit: console.log,
        validate: () => {
          return { test: new Error('this error shown when JsonEditor has no its own errors') }
        },
      },
      { values: true },
    )

    return (
      <Flex width='100%' p='8' gap='4'>
        <Form form={form}>{() => <JsonEditor label='test' name='test' {...state} />}</Form>
        <code style={{ whiteSpace: 'pre-wrap', width: '100%' }}>
          {JSON.stringify(form.getState()?.values, null, 2)}
        </code>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>

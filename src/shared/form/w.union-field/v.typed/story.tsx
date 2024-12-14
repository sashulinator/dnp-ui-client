/* eslint-disable no-console */
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import Typed from '.'

type TestValues = {
  test1: string
  test2: {
    test3: string
  }
}

interface State {}

export default {
  getName: (): string => Typed.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm({ onSubmit: console.log }, { values: true, initialValues: true })

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Form form={form}>
          {() => (
            <Typed<TestValues, 'test2.test3'>
              label='test'
              testValueType={Typed.testValueType}
              name='test2.test3'
              options={[
                { value: '1', display: '1' },
                { value: '2', display: '2' },
                { value: '3', display: '3' },
                { value: '4', display: '4' },
                { value: '5', display: '5' },
              ]}
              {...state}
            />
          )}
        </Form>
        <code>{JSON.stringify(form.getState()?.values, null, 2)}</code>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>

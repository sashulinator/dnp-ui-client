import Flex from '~/shared/flex'
import Form, { Field, useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import type { TextAreaProps } from '..'
import TextArea from '..'

interface State {}

export default {
  getName: (): string => TextArea.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    // eslint-disable-next-line no-console
    const form = useCreateForm({ onSubmit: console.log }, { values: true, initialValues: true })

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Form form={form}>
          {() => (
            <Field<string, TextAreaProps<string>, HTMLInputElement>
              component={TextArea}
              label='test'
              name='test'
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

/* eslint-disable no-console */
import Flex from '~/shared/flex'
import Form, { Field, useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import UnionField, { type Props as TextFieldProps } from './ui.union-field'

interface State {}

export default {
  getName: (): string => UnionField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm({ onSubmit: console.log }, { values: true, initialValues: true })

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Form form={form}>
          {() => <Field<string, TextFieldProps> component={UnionField} label='test' name='test' {...state} />}
        </Form>
        <code>{JSON.stringify(form.getState()?.values, null, 2)}</code>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
